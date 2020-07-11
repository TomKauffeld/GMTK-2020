// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5.Image} image 
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
    /** @type {p5.Image} */
    normal: null,
    /** @type {p5.Image} */
    highlighted: null,
    /** @type {p5.Image} */
    selected: null,
};

export default ButtonPlay;
