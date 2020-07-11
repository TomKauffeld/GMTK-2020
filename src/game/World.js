// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Mob from './sprites/entities/mobs/Mob';
import Tile from './Tile';
import Player from './sprites/entities/mobs/Player';
import Settings from './Settings';
import Ressources from '../gfx/Ressources';
import VoidMob from './sprites/entities/mobs/VoidMob';
import Item from './sprites/entities/item/Item';

class World
{
    /**
     * 
     * @param {number} id
     */
    constructor(id)
    {
        /**
         * @type {p5.Table}
         */
        this.table = Ressources.words[`world_${id}`]; // use the number 1 by default to define the map
        this.last = false; //verify if the input is press during the last tick
        this.id = id;
        /** @type Mob[] */
        this.mobs = [];

        /** @type Item[] */
        this.items = [];

        this.player = new Player(this, 1, 1, 2, new Settings()); //create player character and place it on the map
        this.addMob(this.player);
        this.addMob(new VoidMob(this,2,2,2));
    }

    /**
     * 
     * @param {Mob} mobSource 
     * @param {Mob} mobDestination 
     */
    inRange(mobSource, mobDestination)
    {
        const R = Math.sqrt(Math.pow(mobDestination.getPointX() - mobSource.getPointX(), 2) + Math.pow(mobDestination.getPointY() - mobSource.getPointY(), 2));
        if (R > mobSource.getRange())
        {
            return false;
        }
        const r = Math.PI * 0.25;
        const A = Math.atan2(mobDestination.getPointY() - mobSource.getPointY(), mobDestination.getPointX() - mobSource.getPointX());
        const D = [Math.PI * 0.5, 0, Math.PI * 1.5, Math.PI][mobSource.pos.d];
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
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        for(let i = this.mobs.length - 1; i >= 0; i--)
        {
            this.mobs[i].tick(sketch, time);
            if (this.mobs[i].dead > 1)
            {
                this.addItem(new Item(this, this.mobs[i].pos.x, this.mobs[i].pos.y));
                this.mobs.splice(i, 1);
            }
        }
        for(let i = this.items.length -1; i >= 0; i--){
            this.items[i].tick(sketch, time);
            if (this.items[i].removeReady){
                this.items.splice(i,1);
            }
        }
        if (sketch.keyIsDown(sketch.BACKSPACE))
        {
            if (!this.last)
            {
                const old = this.id;
                while (old === this.id)
                {
                    this.id = Math.floor(Math.random() * 3) + 1; //output an id of a map different of the curent map
                }
                this.loadNewMap(this.id);
            }
            this.last = true;
        }
        else
        {
            this.last = false;
        }
    }

    /**
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
            let r = this.table.get(y, x);
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
     * @param {p5.p5InstanceExtensions} sketch 
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
        const maxX = Math.min(minX + width, this.table.getColumnCount());
        const maxY = Math.min(minY + height, this.table.getRowCount());
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
    }
}

export default World;