// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    LifeBar.bar=sketch.loadImage('/res/ui/Bar_Red_Front.png');
    return LifeBar;
}

const LifeBar = {
    load,
    /** @type {p5.Image} */
    bar: null,
};

export default LifeBar;