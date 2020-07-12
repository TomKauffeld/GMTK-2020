// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import Settings from '../../../Settings';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Mob from './Mob';
import Ressources from '../../../../gfx/Ressources';

class Player extends Mob
{
    /**
     * 
     * @param {World} world
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir  
     */
    constructor(world, posX, posY, dir)
    {
        super(world, 0, Ressources.sprites.mobs.player[`${Settings.player.sexe}_${Settings.player.class}`], 'player', posX, posY, dir, 2.5, 1, 1, 100);
        this.score = 0;
        this.strength = 100;
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {string} action 
     * @returns {boolean}
     */
    keyIsDown(sketch, action)
    {
        if (typeof Settings.keys[action] === 'number')
        {
            return sketch.keyIsDown(Settings.keys[action]);
        }
        return false;
    }

    getRange()
    {
        return 1;
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (this.isDead())
        {
            return;
        }
        
        this.attack = false;
        if (this.keyIsDown(sketch, 'up'))
        {
            this.setPosD(0);
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'right'))
        {
            this.setPosD(1);
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'down'))
        {
            this.setPosD(2);
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'left'))
        {
            this.setPosD(3);
            this.speed = this.maxSpeed;
        }
        else
        {
            this.attack = this.keyIsDown(sketch, 'attack');
            this.speed = 0;
        }
    }

    incrementScore(score)
    {
        this.score += score;
    }


    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        super.render(sketch, scale);
    }
}

export default Player;