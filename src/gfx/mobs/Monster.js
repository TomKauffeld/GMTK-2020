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
    return Monster;
}

const Monster = {
    load,
    /**
     * @type TileSet
     */
    forest_mob: null,
};

export default Monster;