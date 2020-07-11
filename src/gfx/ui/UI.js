// eslint-disable-next-line no-unused-vars
import p5 from 'p5';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch) {
    UI.life_bar_back = sketch.loadImage('/res/ui/Bar_Back.png');
    UI.life_bar_front = sketch.loadImage('/res/ui/Bar_Red_Front.png');
    return UI;
}

const UI = {
    load,
    /** @type {p5.Image} */
    life_bar_front: null,
    /** @type {p5.Image} */
    life_bar_back: null

};

export default UI;