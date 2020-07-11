// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

class TileSet
{
    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} path
     * @param {number} cols 
     * @param {number} rows
     */
    constructor(sketch, path, cols, rows = null)
    {
        this.image = sketch.loadImage(path, (image) => {
            this.scale.x = image.width / this.size.x;
            if (this.size.y === null)
            {
                this.scale.y = this.scale.x;
                this.size.y = image.height / this.scale.y;
            }
            else
            {
                this.scale.y = image.height / this.size.y;
            }
        });
        this.size = {
            x: cols,
            y: rows
        };
        this.scale = {
            x: 0,
            y: 0
        };
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    getTile(x, y, w = 1, h = 1)
    {
        if (this.scale.x === 0 || this.scale.y === 0)
        {
            return null;
        }
        if (x < 0 || y < 0 || x + w >= this.rows || y + h >= this.rows || w <= 0 || h <= 0)
        {
            return null;
        }
        return this.image.get(x * this.scale.x, y * this.scale.y, w * this.scale.x, h * this.scale.y);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} scale 
     * @param {number} sx 
     * @param {number} sy 
     * @param {number} w 
     * @param {number} h 
     */
    draw(sketch, dx, dy, scale, sx, sy, w = 1, h = 1)
    {
        if (this.scale.x === 0 || this.scale.y === 0)
        {
            return null;
        }
        if (sx < 0 || sy < 0 || sx + w >= this.rows || sy + h >= this.rows || w <= 0 || h <= 0)
        {
            return null;
        }
        sketch.image(this.image, dx * scale, dy * scale, w * scale, h * scale, sx * this.scale.x, sy * this.scale.y, w * this.scale.x, h * this.scale.y);
    }
}


export default TileSet;