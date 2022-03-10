// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from '../TileSet';

import min_02 from '../../res/sprites/mobs/monster/02_min.png';
import min_07 from '../../res/sprites/mobs/monster/07_min.png';
import min_17 from '../../res/sprites/mobs/monster/17_min.png';
import min_16 from '../../res/sprites/mobs/monster/16_min.png';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Monster.forest_mob = TileSet.Create(sketch, min_02, 4);
    Monster.desert_mob = TileSet.Create(sketch, min_07, 4);
    Monster.snow_mob = TileSet.Create(sketch, min_17, 4);
    Monster.void_mob = TileSet.Create(sketch, min_16, 4);
    return Monster;
}

const Monster = {
    load,
    /**
     * @type TileSet
     */
    forest_mob: null,
    /**
     * @type TileSet
     */
    desert_mob: null,
    /**
     * @type TileSet
     */
    snow_mob: null,
    /**
     * @type TileSet
     */
    void_mob: null,
};

export default Monster;