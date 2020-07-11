// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    ButtonNone.normal = sketch.loadImage('/res/buttons/Button_None.png');
    ButtonNone.highlighted = sketch.loadImage('/res/buttons/Button_None_HighLighted.png');
    ButtonNone.selected = sketch.loadImage('/res/buttons/Button_None_Selected.png');
    return ButtonNone;
}


const ButtonNone = {
    load,
    /** @type {p5.Image} */
    normal: null,
    /** @type {p5.Image} */
    highlighted: null,
    /** @type {p5.Image} */
    selected: null,
};

export default ButtonNone;
