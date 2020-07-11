// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import ButtonNone from './ButtonNone';
import ButtonPlay from './ButtonPlay';
import ButtonSettings from './ButtonSettings';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    sketch.loadImage('res/buttons.png', (image) => {
        const main = new TileSet(image, 3, 3);
        main.calculate();
        Buttons.none.load(main.getTile(0, 0, 3, 1));
        Buttons.play.load(main.getTile(0, 1, 3, 1));
        Buttons.settings.load(main.getTile(0, 2, 3, 1));
    });
    return Buttons;
}


const Buttons = {
    load,
    none: ButtonNone,
    play: ButtonPlay,
    settings: ButtonSettings
};


export default Buttons;