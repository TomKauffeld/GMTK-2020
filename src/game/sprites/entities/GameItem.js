// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Settings from '../../../Settings';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Entity from './Entity';

class GameItem extends Entity
{
    /**
     * @param {World} world
     * @param {number} score
     */
    constructor(world, name, posX, posY, dir, width = 1, height = 1, score)
    {
        super(name, posX, posY, dir, width, height);
        this.world = world;
        this.score = score;
    }

    take(){
        this.world.player.incrementScore(1);
    }

}

export default GameItem;