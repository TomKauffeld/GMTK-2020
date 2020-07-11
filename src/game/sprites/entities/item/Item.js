// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Settings from '../../../Settings';
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
        this.animation = {
            frame: 0,
            timer: 0,
            time: 0.5 / this.texture.size.x
        };
    }

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
    }

    render(sketch, scale)
    {
        super.render(sketch, scale);
        const tx = this.animation.frame;
        this.texture.draw(sketch, this.pos.x, this.pos.y, scale, tx, 0, this.width, this.height);
    }
}

export default Item;