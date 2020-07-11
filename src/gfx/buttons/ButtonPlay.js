// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    ButtonPlay.normal = sketch.loadImage('/res/buttons/Button_Play.png');
    ButtonPlay.highlighted = sketch.loadImage('/res/buttons/Button_Play_Highlighted.png');
    ButtonPlay.selected = sketch.loadImage('/res/buttons/Button_Play_Selected.png');
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
