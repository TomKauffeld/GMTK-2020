// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Image} from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    sketch.loadImage('res/buttons.png', (image) => {
        const main = new TileSet(image, 3, 1);
        main.calculate();
        Buttons.normal = main.getTile(0, 0, 1, 1);
        Buttons.highlighted = main.getTile(1, 0, 1, 1);
        Buttons.selected = main.getTile(2, 0, 1, 1);
    });
    return Buttons;
}


const Buttons = {
    load,
    /** @type {Image} */
    normal: null,
    /** @type {Image} */
    highlighted: null,
    /** @type {Image} */
    selected: null,
};


export default Buttons;