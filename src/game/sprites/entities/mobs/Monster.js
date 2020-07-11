// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Mob from './Mob';
<<<<<<< HEAD
import Player from '../../../../gfx/mobs/Player';
=======
>>>>>>> master

class Monster extends Mob
{
    /**
     * @param {World} world 
     * @param {TileSet} texture
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} maxSpeed 
     * @param {number} width 
     * @param {number} height 
     * @param {number} life
     */
    constructor(world, texture, name, posX, posY, dir, maxSpeed = 1, width = 1, height = 1 , life = 100)
    {
        super(world, texture, name, posX, posY, dir, maxSpeed, width, height, life);
        this.actions = [
            'up',
            'down',
            'left',
            'right',
            'none'
        ]; //list des déplacement du mob
        this.action = {
            currentAction: 'none',
            timer: 0
        };
    }


    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (this.isDead())
        {
            return;
        }
        this.action.timer += time;
        if (this.action.timer > 0.5)
        {
            this.action.currentAction = this.actions[Math.floor(Math.random()*this.actions.length)]; //select a random move from the array action
            this.action.timer = 0;
        }
        this.attack = false;
<<<<<<< HEAD
        this.speed = 0;
        if(this.inRange(this,Player)){
            this.attack = true;
        }
        else if (this.action.currentAction === 'up')
=======
        if (this.action.currentAction === 'up')
>>>>>>> master
        {
            this.setPosD(0);
            this.speed = this.maxSpeed;
        }
        else if (this.action.currentAction === 'right')
        {
            this.setPosD(1);
            this.speed = this.maxSpeed;
        }
        else if (this.action.currentAction === 'down')
        {
            this.setPosD(2);
            this.speed = this.maxSpeed;
        }
        else if (this.action.currentAction === 'left')
        {
            this.setPosD(3);
            this.speed = this.maxSpeed;
        }
<<<<<<< HEAD
=======
        else
        {
            this.speed = 0;
        }
        /*else
        {
            this.attack = this.keyIsDown(sketch, 'attack');
            this.speed = 0;
        }*/
>>>>>>> master
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

export default Monster;