// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import ButtonNone from './ButtonNone';
import ButtonPlay from './ButtonPlay';
import ButtonSettings from './ButtonSettings';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Buttons.none.load(sketch);
    Buttons.play.load(sketch);
    Buttons.settings.load(sketch);
    return Buttons;
}


const Buttons = {
    load,
    none: ButtonNone,
    play: ButtonPlay,
    settings: ButtonSettings
};


export default Buttons;