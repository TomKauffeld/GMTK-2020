// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Mob from '../mobs/Mob';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Ressources from '../../../../gfx/Ressources';
import Entity from '../Entity';

class Item extends Entity
{
    /**
     * @param {World} world
     * @param {number} score
     */
    constructor(world, posX, posY)
    {
        super(world, 'item', posX, posY, 2, 1, 1);
        this.texture = Ressources.sprites.item.foredrop_item;
        this.removeReady=false;
        this.animation = {
            frame: 0,
            timer: 0,
            time: 0.5 / this.texture.size.x
        };
    }

    /**
     * 
     * @param {Mob} mob 
     */
    inRange(mob)
    {
        return Math.sqrt(Math.pow(this.getPointX() - mob.getPointX(), 2) + Math.pow(this.getPointY() - mob.getPointY(), 2)) < mob.getRange();
    }

    /**
     * 
     */
    takeItem(){
        if (Math.random() > 0){
            this.world.player.strength += Math.random(-2,2);
        }
        else
        {
            this.world.player.score += 100;
        }
        this.removeReady = true;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        this.animation.timer += time;
        if (this.animation.timer > this.animation.time)
        {
            this.animation.timer -= this.animation.time;
            this.animation.frame++;
            this.animation.frame %= this.texture.size.x;
        }
        if(this.inRange(this.world.player))
        {
            this.takeItem();
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
        const tx = this.animation.frame;
        this.texture.draw(sketch, this.pos.x, this.pos.y, scale, tx, 0, this.width, this.height);
    }
}

export default Item;