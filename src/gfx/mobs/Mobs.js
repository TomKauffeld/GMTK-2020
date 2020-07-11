// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Player from './Player';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Mobs.player.load(sketch);
    return Mobs;
}

const Mobs = {
    load,
    player: Player,
};

export default Mobs;