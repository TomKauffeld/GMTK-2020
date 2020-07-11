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
     * @param {number} biome
     * @param {number} posX
     * @param {number} posY
     */
    constructor(world, biome, posX, posY)
    {
        super(world, biome, 'item', posX, posY, 2, 1, 1);
        this.texture = Ressources.sprites.item.foredrop_item;
        this.removeReady=false;
        this.animation = {
            frame: 0,
            timer: 0,
            time: 0.5 / this.texture.size.x
        };
        this.timer = 0;
    }

    /**
     * 
     * @param {Mob} mob 
     */
    inRange(mob)
    {
        if (this.timer < 0.5)
        {
            return false;
        }
        return Math.sqrt(Math.pow(this.getPointX() - mob.getPointX(), 2) + Math.pow(this.getPointY() - mob.getPointY(), 2)) < mob.getRange() / 4;
    }

    /**
     * 
     */
    takeItem(){
        if (this.timer < 0.5)
        {
            return;
        }
        if (Math.random() > .5){
            this.world.player.strength += Math.random(-3,3);
        }
        else
        {
            this.world.player.score *= this.world.player.strength;
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
        this.timer += time;
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
        const ty = this.biome;
        const s = 0.2;
        this.texture.draw(sketch, this.getPointX() - s * this.width / 2 , this.getPointY() - s * this.height / 2, scale, tx, ty, s * this.width, s * this.height, 1, 1);
    }
}

export default Item;