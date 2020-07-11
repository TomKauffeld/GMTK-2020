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
    ButtonPlay.normal = main.getTile(0, 0, 1, 1);
    ButtonPlay.highlighted = main.getTile(1, 0, 1, 1);
    ButtonPlay.selected = main.getTile(2, 0, 1, 1);
    return ButtonPlay;
}


const ButtonPlay = {
    load,
    /** @type {Image} */
    normal: null,
    /** @type {Image} */
    highlighted: null,
    /** @type {Image} */
    selected: null,
};

export default ButtonPlay;
