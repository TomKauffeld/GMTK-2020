// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from './TileSet';


/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch) {
    for(let i = 1; i <= 4; i++)
    {
        Tiles[`grassland_${i}`] = new TileSet(sketch, `/res/tiles/grasslands${i}.png`, 3);
    }
    for(let i = 1; i <= 18; i++)
    {
        Tiles[`town_${i}`] = new TileSet(sketch, `/res/tiles/town${i}.png`, 3);
    }
    return Tiles;
}


const Tiles = {
    load,
    /** @type TileSet */
    grassland_1: null,
    /** @type TileSet */
    grassland_2: null,
    /** @type TileSet */
    grassland_3: null,
    /** @type TileSet */
    grassland_4: null,
    /** @type TileSet */
    town_1: null,
    /** @type TileSet */
    town_2: null,
    /** @type TileSet */
    town_3: null,
    /** @type TileSet */
    town_4: null,
    /** @type TileSet */
    town_5: null,
    /** @type TileSet */
    town_6: null,
    /** @type TileSet */
    town_7: null,
    /** @type TileSet */
    town_8: null,
    /** @type TileSet */
    town_9: null,
    /** @type TileSet */
    town_10: null,
    /** @type TileSet */
    town_11: null,
    /** @type TileSet */
    town_12: null,
    /** @type TileSet */
    town_13: null,
    /** @type TileSet */
    town_14: null,
    /** @type TileSet */
    town_15: null,
    /** @type TileSet */
    town_16: null,
    /** @type TileSet */
    town_17: null,
    /** @type TileSet */
    town_18: null,
};

export default Tiles;