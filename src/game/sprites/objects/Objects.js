// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

class Objects
{
    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {boolean} isSolid
     * @param {number} width 
     * @param {number} height 
     */
    constructor(sketch, name, posX, posY, isSolid = true, width = 1, height = 1)
    {
        this.image = sketch.loadImage(`/res/sprites/objects/${name}.png`);
        this.width = width;
        this.height = height;
        this.isSolid = isSolid;
        this.pos = {x: posX, y: posY};
    }

    /**
     * @returns {boolean}
     */
    getIsSolid()
    {
        return this.isSolid;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        sketch.image(this.image, this.pos.x * scale, this.pos.y * scale, scale * this.width, scale * this.height);
    }
}

export default Objects;