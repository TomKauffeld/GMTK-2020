// eslint-disable-next-line no-unused-vars
import p5 from 'p5';


/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch) {
    for(let i = 1; i <= 2; i++)
    {
        Worlds[`world_${i}`] = sketch.loadTable(`/res/worlds/world_${i}.csv`);
    }
    return Worlds;
}


const Worlds = {
    load,
    /**
     * @type p5.Table
     */
    world_1: null,
    /**
     * @type p5.Table
     */
    world_2: null,
};

export default Worlds;