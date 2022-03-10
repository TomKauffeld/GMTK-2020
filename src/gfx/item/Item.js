// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from '../TileSet';

import items from '../../res/items.png';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Item.foredrop_item = TileSet.Create(sketch, items, 1);
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