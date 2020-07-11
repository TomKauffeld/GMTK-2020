// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Player.female_thief = new TileSet(sketch, '/res/sprites/mobs/player/female_thief.png', 4);
    Player.male_thief = new TileSet(sketch, '/res/sprites/mobs/player/male_thief.png', 4);
    return Player;
}

const Player = {
    load,
    /**
     * @type TileSet
     */
    female_thief: null,
    /**
     * @type TileSet
     */
    male_thief: null,
};

export default Player;