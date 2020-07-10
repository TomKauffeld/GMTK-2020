// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

class Entity
{
    /**
     *
     * @param {string} name
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(name, posX, posY, dir, width = 1, height = 1)
    {
        this.name = name;
        this.width = width;
        this.height = height;
        this.pos = {x: posX, y: posY, d: dir};
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time){}

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale){}
}

export default Entity;