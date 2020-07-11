// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Settings from '../../../Settings';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import GameItem from '../GameItem';
import Ressources from '../../../../gfx/Ressources';

class Item extends GameItem
{
    /**
     * @param {World} world
     * @param {number} score
     */
    constructor(world, posX, posY)
    {
        super(world, Ressources.sprites.item.item, '???', posX, posY, 1, 1);
    }

    render(sketch, scale)
    {
        super.render(sketch, scale);
        this.texture.draw(sketch, this.pos.x, this.pos.y, scale, 0, 0, this.width, this.height);
    }
}

export default Item;