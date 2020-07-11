// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    ForestMob.female_thief = new TileSet(sketch, '/res/sprites/mobs/forestMob/female_thief.png', 4);
    return ForestMob;
}

const ForestMob = {
    load,
    /**
     * @type TileSet
     */
    female_thief: null,
};

export default ForestMob;