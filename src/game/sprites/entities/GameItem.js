// eslint-disable-next-line no-unused-vars
import World from '../../World';
import Entity from './Entity';
// import takeRange from './takeRange';

class GameItem extends Entity
{
    /**
     * @param {World} world
     * @param {number} score
     */
    constructor(world, texture, name, posX, posY, dir, score, width = 1, height = 1)
    {
        super(name, posX, posY, dir, width, height);
        this.world = world;
        this.score = score;
        this.texture = texture;
    }

   
/*
    tick(sketch, time)
    {
        take(){
            if(takeRange(this.world.player)){
                this.world.player.effect(item.effect());
            }
        }
        super.tick(sketch, time);
    }
*/
}

export default GameItem;