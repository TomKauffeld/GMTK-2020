// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from '../TileSet';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Player.female_thief = TileSet.Create(sketch, 'res/sprites/mobs/player/female_thief_min.png', 4);
    Player.male_thief = TileSet.Create(sketch, 'res/sprites/mobs/player/male_thief_min.png', 4);
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