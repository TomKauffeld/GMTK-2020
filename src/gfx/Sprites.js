// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Mobs from './mobs/Mobs';
import Item from './item/Item';



/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Sprites.mobs.load(sketch);
    Sprites.item.load(sketch);
    return Sprites;
}

const Sprites = {
    load,
    mobs: Mobs,
    item: Item,
};

export default Sprites;