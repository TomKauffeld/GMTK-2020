// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Image} from 'p5';

class TileSet
{

    /**
     * 
     * @param {Image} image 
     * @param {number} cols 
     * @param {number} rows
     */
    constructor(image, cols, rows = null)
    {
        this.image = image;
        this.size = {
            x: cols,
            y: rows
        };
        this.scale = {
            x: 0,
            y: 0
        };
    }

    calculate()
    {
        this.scale.x = this.image.width / this.size.x;
        if (this.size.y === null)
        {
            this.scale.y = this.scale.x;
            this.size.y = this.image.height / this.scale.y;
        }
        else
        {
            this.scale.y = this.image.height / this.size.y;
        }
        return this;
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
        return this.image.get(Math.ceil(x * this.scale.x), Math.ceil(y * this.scale.y), Math.floor(w * this.scale.x), Math.floor(h * this.scale.y));
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} scale 
     * @param {number} sx 
     * @param {number} sy 
     * @param {number} w 
     * @param {number} h 
     */
    draw(sketch, dx, dy, scale, sx, sy, dw = 1, dh = 1, sw = null, sh = null)
    {
        if (sw === null)
        {
            sw = dw;
        }
        if (sh === null)
        {
            sh = dh;
        }
        if (this.scale.x === 0 || this.scale.y === 0)
        {
            return null;
        }
        if (sx < 0 || sy < 0 || sx + sw >= this.rows || sy + sh >= this.rows || sw <= 0 || sh <= 0)
        {
            return null;
        }
        sketch.image(this.image, Math.floor(dx * scale), Math.floor(dy * scale), Math.ceil(dw * scale), Math.ceil(dh * scale), Math.ceil(sx * this.scale.x), Math.ceil(sy * this.scale.y), Math.floor(sw * this.scale.x), Math.floor(sh * this.scale.y));
    }
}

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 * @param {string} path
 * @param {number} cols 
 * @param {number} rows
 */
TileSet.Create = function(sketch, path, cols, rows = null)
{

    const image = sketch.loadImage(path, () => {
        tileSet.calculate();
    });
    const tileSet = new TileSet(image, cols, rows);
    return tileSet;
};


export default TileSet;