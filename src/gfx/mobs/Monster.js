// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Monster.forest_mob = TileSet.Create(sketch, '/res/sprites/mobs/monster/02.png', 4);
    Monster.desert_mob = TileSet.Create(sketch, '/res/sprites/mobs/monster/07.png', 4);
    Monster.snow_mob = TileSet.Create(sketch, '/res/sprites/mobs/monster/17.png', 4);
    Monster.void_mob = TileSet.Create(sketch, '/res/sprites/mobs/monster/16.png', 4);
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