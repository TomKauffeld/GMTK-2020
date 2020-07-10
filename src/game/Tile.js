// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

class Tile
{
    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} name 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(sketch, name, width = 1, height = 1)
    {
        this.name = name;
        this.image = sketch.loadImage(`/res/tiles/${name}.png`);
        this.width = width;
        this.height = height;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     * @param {number} posX
     * @param {number} posY
     */
    render(sketch, scale, posX, posY)
    {
        sketch.image(this.image, posX * scale, posY * scale, scale * this.width, scale * this.height);
    }
}

export default Tile;