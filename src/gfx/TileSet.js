// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

class TileSet
{

    /**
     * 
     * @param {p5.Image} image 
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
        sketch.image(this.image, dx * scale, dy * scale, dw * scale, dh * scale, sx * this.scale.x, sy * this.scale.y, sw * this.scale.x, sh * this.scale.y);
    }
}

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
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