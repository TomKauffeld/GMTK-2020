// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Mob from './Mob';
import Ressources from '../../../../gfx/Ressources';

class ForestMob extends Mob
{
    /**
     * @param {World} world
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir
     */
    constructor(world, posX, posY, dir)
    {
        super(world, 'mouse', posX, posY, dir, 1, 1);
        this.animation = {
            frame: 0,
            counter: 0
        };
        this.oldImage = null;
        this.attack = false;
        this.action = [
            'up',
            'down',
            'left',
            'right'
        ]; //list des déplacement du mob
    }
    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        var randomAction = this.action[Math.floor(Math.random()*this.action.length)]; //select a random move from the arrray action
        this.attack = false;
        if (randomAction === 'up')
        {
            this.pos.d = 0;
            this.speed = this.maxSpeed;
        }
        else if (randomAction === 'right')
        {
            this.pos.d = 1;
            this.speed = this.maxSpeed;
        }
        else if (randomAction === 'down')
        {
            this.pos.d = 2;
            this.speed = this.maxSpeed;
        }
        else if (randomAction === 'left')
        {
            this.pos.d = 3;
            this.speed = this.maxSpeed;
        }
        /*else
        {
            this.attack = this.keyIsDown(sketch, 'attack');
            this.speed = 0;
        }*/
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        const dir = [4, 12, 0, 8][this.pos.d];
        const ty = this.speed > 0 ? dir + 1 : (this.attack ? dir + 2 : dir);
        if (this.oldImage !== ty)
        {
            this.oldImage = ty;
            this.animation.counter = 0;
            this.animation.frame = 0;
        }
        const tx = this.animation.frame;
        Ressources.sprites.mobs.forestMob.female_thief.draw(sketch, this.pos.x, this.pos.y, scale, tx, ty, this.width, this.height);
        this.animation.counter++;
        if (this.animation.counter > 5)
        {
            this.animation.counter = 0;
            this.animation.frame++;
            this.animation.frame %= 4;
        }
        super.render(sketch, scale);
    }
}

export default ForestMob;