// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Table} from 'p5';


/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch) {
    for(let i = 1; i <= 3; i++)
    {
        Worlds[`world_${i}`] = sketch.loadTable(`res/worlds/world_${i}.csv`);
    }
    return Worlds;
}


const Worlds = {
    load,
    /**
     * @type Table
     */
    world_1: null,
    /**
     * @type Table
     */
    world_2: null,
    /**
     * @type Table
     */
    world_3: null,
};

export default Worlds;