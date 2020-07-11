// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Entity from '../Entity';

class Mob extends Entity
{
    /**
     * 
     * @param {World} world 
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} maxSpeed 
     * @param {number} width 
     * @param {number} height 
     * @param {number} life
     */
    constructor(world, name, posX, posY, dir, maxSpeed = 1, width = 1, height = 1 , life = 100)
    {
        super(name, posX, posY, dir, width, height);
        this.world = world;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.life = life;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        const oldX = this.pos.x;
        const oldY = this.pos.y;
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
        if (this.world.isSolid(this.pos.x + this.width / 2, this.pos.y + this.height - 0.2))
        {
            this.pos.x = oldX;
            this.pos.y = oldY;
        }
        super.tick(sketch, time);
    }

    takeDamages(damages)
    {
        this.life-=damages;
    }

    addLife(number)
    {
        this.life+=number;
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