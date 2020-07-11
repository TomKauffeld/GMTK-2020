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
    return Tiles;
}


const Tiles = {
    load,
    /**
     * @type TileSet
     */
    grassland_1: null,
    /**
     * @type TileSet
     */
    grassland_2: null,
    /**
     * @type TileSet
     */
    grassland_3: null,
    /**
     * @type TileSet
     */
    grassland_4: null,
};

export default Tiles;