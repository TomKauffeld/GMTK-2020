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
        sketch.loadImage(`/res/tiles/grasslands${i}.png`, (image1) => {
            sketch.loadImage(`/res/tiles/grasslands${i}_corner.png`, (image2) => {
                sketch.loadImage(`/res/tiles/grasslands${i}_line_v.png`, (image3) => {
                    sketch.loadImage(`/res/tiles/grasslands${i}_line_h.png`, (image4) => {
                        const image = sketch.createImage(Math.max(image1.width, image2.width), image1.height + image2.height + image3.height);
                        image.copy(image1, 0, 0, image1.width, image1.height, 0, 0, image1.width, image1.height);
                        image.copy(image2, 0, 0, image2.width, image2.height, 0, image1.height, image2.width, image2.height);
                        image.copy(image3, 0, 0, image3.width, image3.height, 0, image1.height + image2.height, image3.width, image3.height);
                        image.copy(image4, 0, 0, image4.width, image4.height, image4.width, image1.height + image2.height, image4.width, image4.height);
                        const tile = new TileSet(image, 3);
                        tile.calculate();
                        Tiles[`grassland_${i}`] = tile;
                    });
                });
            });
        });
    }
    for(let i = 2; i <= 18; i++)
    {
        sketch.loadImage(`/res/tiles/town${i}.png`, (image1) => {
            sketch.loadImage(`/res/tiles/town${i}_corner1.png`, (image2) => {
                const image = sketch.createImage(image1.width, image1.height + image2.height);
                image.copy(image1, 0, 0, image1.width, image1.height, 0, 0, image1.width, image1.height);
                image.copy(image2, 0, 0, image2.width, image2.height, 0, image1.height, image2.width, image2.height);
                const tile = new TileSet(image, 3);
                tile.calculate();
                Tiles[`town_${i}`] = tile;
            });
        });
    }
    sketch.loadImage('/res/tiles/iceland.png', (image1) => {
        sketch.loadImage('/res/tiles/iceland_corner1.png', (image2) => {
            const image = sketch.createImage(image1.width, image1.height + image2.height);
            image.copy(image1, 0, 0, image1.width, image1.height, 0, 0, image1.width, image1.height);
            image.copy(image2, 0, 0, image2.width, image2.height, 0, image1.height, image2.width, image2.height);
            const tile = new TileSet(image, 3);
            tile.calculate();
            Tiles.iceland = tile;
        });
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