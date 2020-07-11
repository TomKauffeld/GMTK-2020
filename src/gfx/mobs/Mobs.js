// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Player from './Player';
import ForestMob from './ForestMob';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Mobs.player.load(sketch);
    Mobs.forestMob.load(sketch);
    return Mobs;
}

const Mobs = {
    load,
    player: Player,
    forestMob: ForestMob,
};

export default Mobs;