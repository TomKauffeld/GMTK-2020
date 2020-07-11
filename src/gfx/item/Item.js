// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Item.item = TileSet.Create(sketch,'/res/sprites/item/18.png', 4);
    return Item;
}

const Item = {
    load,
    /**
     * @type TileSet
     */
    foredrop_item: null,
};

export default Item;