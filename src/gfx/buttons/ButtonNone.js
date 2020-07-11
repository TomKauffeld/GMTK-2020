// eslint-disable-next-line no-unused-vars
import {Image} from 'p5';
import TileSet from '../TileSet';
/**
 * 
 * @param {Image} image 
 */
function load(image)
{
    const main = new TileSet(image, 3, 1);
    main.calculate();
    ButtonNone.normal = main.getTile(0, 0, 1, 1);
    ButtonNone.highlighted = main.getTile(1, 0, 1, 1);
    ButtonNone.selected = main.getTile(2, 0, 1, 1);
    return ButtonNone;
}


const ButtonNone = {
    load,
    /** @type {Image} */
    normal: null,
    /** @type {Image} */
    highlighted: null,
    /** @type {Image} */
    selected: null,
};

export default ButtonNone;
