// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    ButtonSettings.normal = sketch.loadImage('/res/buttons/Button_Settings.png');
    ButtonSettings.highlighted = sketch.loadImage('/res/buttons/Button_Settings_HighLighted.png');
    ButtonSettings.selected = sketch.loadImage('/res/buttons/Button_Settings_Selected.png');
    return ButtonSettings;
}


const ButtonSettings = {
    load,
    /** @type {p5.Image} */
    normal: null,
    /** @type {p5.Image} */
    highlighted: null,
    /** @type {p5.Image} */
    selected: null,
};

export default ButtonSettings;
