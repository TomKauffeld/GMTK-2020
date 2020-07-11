// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Tile from './Tile';
import Player from './sprites/entities/mobs/Player';
import Settings from './Settings';
import Ressources from '../gfx/Ressources';
import ForestMob from './sprites/entities/mobs/ForestMob';

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
        this.player = new Player(this, 1, 1, 2, new Settings()); //create player character and place it on the map
        this.mob = new ForestMob(this,2,2,2);
        this.last = false; //verify if the input is press during the last tick
        this.id = id;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} id
     */
    loadNewMap(sketch, id)
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
        this.player.tick(sketch, time);
        this.mob.tick(sketch, time);
        if (sketch.keyIsDown(sketch.BACKSPACE))
        {
            if (!this.last)
            {
                const old = this.id;
                while (old === this.id)
                {
                    this.id = Math.floor(Math.random() * 2) + 1; //output an id of a map different of the curent map
                }
                this.loadNewMap(sketch, this.id);
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
        this.player.render(sketch, scale);
        this.mob.render(sketch, scale);
        sketch.pop(); //apply the translation
    }
}

export default World;