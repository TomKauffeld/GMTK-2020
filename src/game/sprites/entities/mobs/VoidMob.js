// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Ressources from '../../../../gfx/Ressources';
import Monster from './Monster';

class VoidMob extends Monster
{
    /**
     * @param {World} world
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir
     */
    constructor(world, posX, posY, dir)
    {
        super(world, Ressources.sprites.mobs.monster.void_mob, 'BigBrother', posX, posY, dir, 1, 1);
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

export default VoidMob;