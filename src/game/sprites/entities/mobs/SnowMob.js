// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Ressources from '../../../../gfx/Ressources';
import Monster from './Monster';

class SnowMob extends Monster
{
    /**
     * @param {World} world
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir
     */
    constructor(world, posX, posY, dir)
    {
        super(world, 3, Ressources.sprites.mobs.monster.snow_mob, 'WarYetee', posX, posY, dir, 1, 1);
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

export default SnowMob;