// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../World';

class Entity
{
    /**
     *
     * @param {World} world
     * @param {number} biome 
     * @param {string} name
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(world, biome, name, posX, posY, dir, width = 1, height = 1)
    {
        this.entityId = Entity.newId++;
        this.biome = biome;
        this.world = world;
        this.name = name;
        this.width = width;
        this.height = height;
        this.pos = {x: posX, y: posY, d: dir};
    }
    /**
     * 
     */
    getPoint()
    {
        return {
            x: this.getPointX(), 
            y: this.getPointY()
        };
    }
    /**
     * 
     */
    getPointX()
    {
        return this.pos.x + this.width / 2;
    }

    /**
     * 
     */
    getPointY()
    {
        return this.pos.y + this.height - 0.2;
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    // eslint-disable-next-line no-unused-vars
    tick(sketch, time){}

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    // eslint-disable-next-line no-unused-vars
    render(sketch, scale){}
}

Entity.newId = 1;

export default Entity;