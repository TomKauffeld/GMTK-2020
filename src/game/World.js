// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import Table from '../Table';
// eslint-disable-next-line no-unused-vars
import Mob from './sprites/entities/mobs/Mob';
// eslint-disable-next-line no-unused-vars
import Entity from './sprites/entities/Entity';
import Tile from './Tile';
import Player from './sprites/entities/mobs/Player';
import Ressources from '../gfx/Ressources';
import VoidMob from './sprites/entities/mobs/VoidMob';
import Item from './sprites/entities/item/Item';
import DesertMob from './sprites/entities/mobs/DesertMob';
import ForestMob from './sprites/entities/mobs/ForestMob';
import SnowMob from './sprites/entities/mobs/SnowMob';
import Settings from './Settings';

const AUTO_CHANGE = 60;

class World
{
    /**
     * 
     * @param {number} id
     */
    constructor(id)
    {
        /**
         * @type {Table}
         */
        this.table = Ressources.words[`world_${id}`]; // use the number 1 by default to define the map
        this.last = false; //verify if the input is press during the last tick
        this.id = id;
        this.corruption = 1;
        /** @type Mob[] */
        this.mobs = [];

        /** @type Item[] */
        this.items = [];

        this.player = new Player(this, 1, 1, 2); //create player character and place it on the map
        while (this.isSolid(this.player.getPointX(), this.player.getPointY()))
        {
            this.player.pos.x = Math.random() * (this.table.getColumnCount() - 1);
            this.player.pos.y = Math.random() * (this.table.getRowCount() - 1);
        }
        this.addMob(this.player);

        this.autoChange = AUTO_CHANGE;
        this.end = false;
        this.score = 0;
        this.lastScoreColorChanged = 0;
    }

    distance(x1, y1, x2, y2)
    {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    /**
     * 
     * @param {Mob} from 
     * @param {Entity} to 
     */
    inRange(from, to)
    {
        const fx = from.getPointX();
        const fy = from.pos.y + from.height / 2;
        const tx = to.getPointX();
        const ty = to.pos.y + to.height / 2;
        const R = this.distance(fx, fy, tx, ty);
        if (R > from.getRange())
        {
            return false;
        }
        if (R < from.getRange() / 2)
        {
            return true;
        }
        const r = Math.PI * 0.25;
        const A = Math.atan2(ty - fy, tx - fx);
        const D = [Math.PI * 0.5, 0, Math.PI * 1.5, Math.PI][from.pos.d];
        const S = D - r < 0 ? Math.PI * 2 - D - r : D - r;
        const E = D + r > Math.PI * 2 ? r + D - Math.PI * 2: D + r;
        if (S < E)
        {
            return S < A && A < E;
        }
        else
        {
            if (A > S)
            {
                return true;
            }
            else if (A < E)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }


    /**
     * 
     * @param {Mob} mob 
     */
    addMob(mob)
    {
        this.mobs.push(mob);
    }

    /** 
     * @param {Item} item
    */
    addItem(item)
    {
        this.items.push(item);
    }

    /**
     * 
     * @param {number} id
     */
    loadNewMap(id)
    {
        this.id = id;
        this.table = Ressources.words[`world_${id}`];
        for (let i = 0; i < this.mobs.length; i++)
        {
            if (this.mobs[i].biome === this.getBiome())
            {
                this.mobs[i].life = -1;
            }
        }
        for (let i = 0; i < this.items.length; i++)
        {
            if (this.items[i].biome === this.getBiome())
            {
                this.items[i].removeReady = true;
            }
        }
    }

    getBiome()
    {
        const biomes = [1, 3, 2];
        if (this.id > 0 && this.id <= biomes.length)
        {
            return biomes[this.id - 1];
        }
        else
        {
            return 1;
        }
    }

    spawnMonster()
    {
        let mob = null;
        let l = 0;
        let x = Math.random() * (this.table.getColumnCount() - 1);
        let y = Math.random() * (this.table.getRowCount() - 1);
        if (l < 100)
        {
            l = 0;
            while (mob === null && l < 100)
            {
                l++;
                const r = Math.floor(Math.random() * 4);
                switch(r)
                {
                case 0:
                    mob = new DesertMob(this, x, y, 2);
                    break;
                case 1:
                    mob = new ForestMob(this, x, y, 2);
                    break;
                case 2:
                    mob = new SnowMob(this, x, y, 2);
                    break;
                case 3:
                    mob = new VoidMob(this, x, y, 2);
                    break;
                }
                if (mob.biome === this.getBiome())
                {
                    mob = null;
                }
            }
            if (mob !== null)
            {
                l = 0;
                while (l < 1000 && (this.isSolid(mob.getPointX(), mob.getPointY()) || Math.sqrt(Math.pow(this.player.getPointX() - mob.getPointX(), 2) + Math.pow(this.player.getPointY() - mob.getPointY(), 2)) < 5))
                {
                    mob.pos.x = Math.random() * (this.table.getColumnCount() - 1);
                    mob.pos.y = Math.random() * (this.table.getRowCount() - 1);
                    l++;
                }
                this.addMob(mob);
            }
        }
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        if (this.corruption > 20)
        {
            if (this.autoChange > 0)
            {
                this.autoChange = Math.max(this.autoChange, 0);
            }
            else
            {
                this.autoChange = AUTO_CHANGE;
                if (Math.random() < 0.125)
                {
                    const old = this.id;
                    while (old === this.id)
                    {
                        this.id = Math.floor(Math.random() * 3) + 1; //output an id of a map different of the curent map
                    }
                    this.loadNewMap(this.id);
                }
            }
        }
        this.corruption += time * Math.random() * 0.2;
        if (Math.random() < 0.01 && this.mobs.length < Math.min(100, this.corruption * 2 + 20))
        {
            this.spawnMonster();
        }
        for(let i = this.mobs.length - 1; i >= 0; i--)
        {
            this.mobs[i].tick(sketch, time);
            if (this.mobs[i].dead > 1)
            {
                if (this.mobs[i].entityId !== this.player.entityId && this.mobs[i].biome !== this.getBiome())
                {
                    this.player.score += 100;
                    this.score = this.player.score;   
                    const item = new Item(this, this.mobs[i].biome, this.mobs[i].pos.x, this.mobs[i].pos.y);
                    this.addItem(item);
                    this.corruption += Math.random() * 0.5;
                }
                if (this.mobs[i].entityId === this.player.entityId)
                {
                    this.score = this.player.score;
                    this.end = true;
                }
                this.mobs.splice(i, 1);
            }
        }
        for(let i = this.items.length -1; i >= 0; i--){
            this.items[i].tick(sketch, time);
            if (this.items[i].removeReady){
                this.items.splice(i,1);
            }
        }
        this.score = this.player.score;
        
        if (Math.random() < 0.1 * time * Math.min(1, this.corruption / 1000)){
            Settings.inverseControls();
        }
        if (sketch.keyIsDown(Settings.keys.change))
        {
            if (!this.last)
            {
                const old = this.id;
                while (old === this.id)
                {
                    this.id = Math.floor(Math.random() * 3) + 1; //output an id of a map different of the curent map
                }
                this.loadNewMap(this.id);
                this.corruption += 1;
                if (Math.random() < 0.1 * Math.min(1, this.corruption / 10)){
                    Settings.inverseControls();
                }
            }
            this.last = true;
        }
        else
        {
            this.last = false;
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Tile|null}
     */
    getTile(x, y) //check the tile needed
    {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || y < 0 || x >= this.table.getColumnCount() || y >= this.table.getRowCount())
        {
            return null;
        }
        else
        {
            const r = this.table.get(y, x);
            if (typeof r === 'string' && typeof Tile.tiles[r] === 'object')
            {
                return Tile.tiles[r];
            }
            else
            {
                return null;
            }
        }
    }

    /**
     * 
     * @param {Mob} mob 
     */
    attack(mob)
    {
        for(let i = 0; i < this.mobs.length; i++)
        {
            if (this.mobs[i].entityId !== mob.entityId && this.inRange(mob, this.mobs[i]))
            {
                this.mobs[i].life -= mob.strength;
            }
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean}
     */
    isSolid(x, y)
    {
        const tile = this.getTile(x, y);
        if (tile === null)
        {
            return true;
        }
        else
        {
            return tile.isSolid(x - Math.floor(x), y - Math.floor(y));
        }
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} scale 
     * @param {number} width 
     * @param {number} height 
     */
    render(sketch, scale, width, height)
    {
        const offset = {
            x: width / 2 - this.player.pos.x - this.player.width / 2, //center the player on the middle of the map
            y: height / 2 - this.player.pos.y - this.player.height / 2, //center the player on the middle of the map
        };
        sketch.push(); //save the curent display of map / player / mob
        sketch.translate(offset.x * scale, offset.y * scale); //translate all entity and map by offset

        const minX = Math.max(0, offset.x - width / 2);
        const minY = Math.max(0, offset.y - height / 2);
        const maxX = width - offset.x;
        const maxY = height - offset.y;
        for (let y = minY; y < maxY; y++)
        {
            for (let x = minX; x < maxX; x++)
            {
                const tile = this.getTile(x, y);
                if (tile !== null)
                {
                    tile.render(sketch, scale, Math.floor(x), Math.floor(y));
                }
            }
        }

        let sprites = [];
        sprites.push(...this.mobs);
        sprites.push(...this.items);

        sprites = sprites.sort((a, b) => a.pos.y - b.pos.y);

        for(let i = 0; i < sprites.length; i++)
        {
            sprites[i].render(sketch, scale);
        }
        sketch.pop(); //apply the translation
        const size = 5 * scale;
        const res = Ressources.ui.life_bar_back.height / Ressources.ui.life_bar_back.width;
        sketch.image(Ressources.ui.life_bar_back, 0, 0, size, size * res);
        const part = Math.max(this.player.life / 100, 0);
        if (this.player.life > 0)
        {
            sketch.image(Ressources.ui.life_bar_front, 0, 0, size * part, size * res, 0, 0, part * Ressources.ui.life_bar_front.width, Ressources.ui.life_bar_front.height);
        }
        //score & strength displaying :
        sketch.textAlign('left');
        if(this.lastScoreColorChanged != Math.floor(this.corruption * 0.9))
        {
            sketch.fill(Math.floor(Math.random() * Math.floor(255)), Math.floor(Math.random() * Math.floor(255)), Math.floor(Math.random() * Math.floor(255)));
            this.lastScoreColorChanged = Math.floor(this.corruption * 0.9);
        }
        if (this.corruption < 7)
        {
            sketch.fill(0, 102, 153);
        }
        
        sketch.textSize(scale / 4);
        const x = sketch.textWidth('Corruption: ');
        sketch.text('Score: ', scale / 7, scale * 0.7);
        sketch.text('Strength: ', scale / 7, scale);
        sketch.text('Corruption: ', scale / 7, scale * 1.3);
        sketch.text('Mobs: ', scale / 7, scale * 1.6);
        sketch.text(Math.round(this.player.score), scale * 0.5 + x, scale * 0.7);
        sketch.text(Math.round(this.player.strength * 100) / 100, scale * 0.5 + x, scale);
        sketch.text(Math.round(this.corruption), scale * 0.5 + x, scale * 1.3);
        sketch.text(this.mobs.length - 1, scale * 0.5 + x, scale * 1.6);
        if (Settings.keys.inversed)
        {
            sketch.fill(255, 0, 0);
            sketch.text('Inversed controls', scale / 7, scale * 1.9);
        }

    }
}

export default World;