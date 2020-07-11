// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Tile from './Tile';
import Player from './sprites/entities/mobs/Player';
import Settings from './Settings';
import Ressources from '../gfx/Ressources';

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
        this.table = Ressources.words[`world_${id}`];
        this.player = new Player(this, 1, 1, 2, new Settings());
        this.last = false;
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
        if (sketch.keyIsDown(sketch.BACKSPACE))
        {
            if (!this.last)
            {
                const old = this.id;
                while (old === this.id)
                {
                    this.id = Math.floor(Math.random() * 2) + 1;
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
    getTile(x, y)
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
            x: width / 2 - this.player.pos.x - this.player.width / 2,
            y: height / 2 - this.player.pos.y - this.player.height / 2,
        };
        sketch.push();
        sketch.translate(offset.x * scale, offset.y * scale);

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
        sketch.pop();
    }
}

export default World;