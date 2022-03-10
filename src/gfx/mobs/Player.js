// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import TileSet from '../TileSet';

import female_thief_min from '../../res/sprites/mobs/player/female_thief_min.png';
import male_thief_min from '../../res/sprites/mobs/player/male_thief_min.png';

/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch)
{
    Player.female_thief = TileSet.Create(sketch, female_thief_min, 4);
    Player.male_thief = TileSet.Create(sketch, male_thief_min, 4);
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