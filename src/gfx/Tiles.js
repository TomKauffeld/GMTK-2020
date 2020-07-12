// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from './TileSet';


/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch) {
    sketch.loadImage('res/tiles.png', (image) => {
        const main = new TileSet(image, 16);
        main.calculate();
        for(let i = 0; i < 4; i++)
        {
            Tiles[`grassland_${i+1}`] = new TileSet(main.getTile(i * 3, 0, 3, 6), 3).calculate();
        }
        Tiles.iceland = new TileSet(main.getTile(12, 0, 3, 6), 3).calculate();
        for (let i = 0; i < 17; i++)
        {
            const w = 4;
            const h = 5;
            const x = i % w;
            const y = Math.floor(i / w);
            Tiles[`town_${i+2}`] = new TileSet(main.getTile(x * w, y * h + 6, w, h), w).calculate();
        }
        for (let i = 0; i < 4; i++)
        {
            const y = i * 5 + 26;
            const x = 6;
            const w = 10;
            const h = 5;
            Tiles[`desert_${i+1}`] = new TileSet(main.getTile(x, y, w, h), w).calculate();
        }
    });
    return Tiles;
}


const Tiles = {
    load,
    /** @type TileSet */
    iceland: null,
    /** @type TileSet */
    grassland_1: null,
    /** @type TileSet */
    grassland_2: null,
    /** @type TileSet */
    grassland_3: null,
    /** @type TileSet */
    grassland_4: null,
    /** @type TileSet */
    desert_1: null,
    /** @type TileSet */
    desert_2: null,
    /** @type TileSet */
    desert_3: null,
    /** @type TileSet */
    desert_4: null,
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