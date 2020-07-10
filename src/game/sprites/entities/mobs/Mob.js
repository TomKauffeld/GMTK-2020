// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Entity from '../Entity';

class Mob extends Entity
{
    /**
     * 
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} maxSpeed 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(name, posX, posY, dir, maxSpeed = 1, width = 1, height = 1)
    {
        super(name, posX, posY, dir, width, height);
        this.speed = 0;
        this.maxSpeed = maxSpeed;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        switch(this.pos.d)
        {
        case 0:
            this.pos.y -= this.speed * time;
            break;
        case 1:
            this.pos.x += this.speed * time;
            break;
        case 2:
            this.pos.y += this.speed * time;
            break;
        case 3:
            this.pos.x -= this.speed * time;
        }
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        super.render(sketch, scale);
    }
}

export default Mob;