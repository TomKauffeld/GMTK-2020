// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Item.foredrop_item = TileSet.Create(sketch,'res/items.png', 1);
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