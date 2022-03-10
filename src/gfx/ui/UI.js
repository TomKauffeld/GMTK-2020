// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Image} from 'p5';

import bar_back from '../../res/ui/Bar_Back.png';
import bar_red_front from '../../res/ui/Bar_Red_Front.png';
import glitchyland_title from '../../res/glitchyland_title.png';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch) {
    UI.life_bar_back = sketch.loadImage(bar_back);
    UI.life_bar_front = sketch.loadImage(bar_red_front);
    UI.title = sketch.loadImage(glitchyland_title);
    return UI;
}

const UI = {
    load,
    /** @type {Image} */
    life_bar_front: null,
    /** @type {Image} */
    life_bar_back: null,
    /** @type {Image} */
    title: null,
};

export default UI;