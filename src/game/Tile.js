// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Image} from 'p5';
import Ressources from '../gfx/Ressources';

const BORDER_NONE = 0x00;
const BORDER_TOP = 0x01;
const BORDER_RIGHT = 0x02;
const BORDER_BOTTOM = 0x04;
const BORDER_LEFT = 0x08;
const BORDER_TOP_LEFT = BORDER_TOP | BORDER_LEFT;
const BORDER_TOP_RIGHT = BORDER_TOP | BORDER_RIGHT;
const BORDER_BOTTOM_LEFT = BORDER_BOTTOM | BORDER_LEFT;
const BORDER_BOTTOM_RIGHT = BORDER_BOTTOM | BORDER_RIGHT;
const BORDER_ALL = BORDER_TOP | BORDER_LEFT | BORDER_RIGHT | BORDER_BOTTOM;

function isFlagSet(value, flag)
{
    return (value & flag) > 0;
}


class Tile
{
    /**
     * 
     * @param {string} type
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {boolean} solid 
     * @param {number} width 
     * @param {number} height 
     * @param {number} border;
     * @param {number} border_size
     */
    constructor(type, name, x, y, solid = false, width = 1, height = 1, border = BORDER_NONE, border_size = 0.4)
    {
        this.name = name;
        this.type = type;
        this.width = 1;
        this.height = 1;
        this.resWidth = width;
        this.resHeight = height;
        this.solid = solid;
        this.x = x;
        this.y = y;
        this.border = border;
        this.border_size = border_size;
        Tile.tiles[`${type}:${name}`] = this;
        if (typeof Tile.collection[type] === 'undefined')
        {
            Tile.collection[type] = {};
        }
        Tile.collection[type][name] = this;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    isSolid(x, y)
    {
        if (isFlagSet(this.border, BORDER_LEFT) && x < this.border_size)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_RIGHT) && x > this.width - this.border_size)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_TOP) && y < this.border_size)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_BOTTOM) && y > this.height - this.border_size)
        {
            return !this.solid;
        }
        else
        {
            return this.solid;
        }
    }

    /**
     * @returns {Image}
     */
    getImage()
    {
        return Ressources.tiles[this.type].getTile(this.x, this.y, this.resWidth, this.resHeight);
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} scale
     * @param {number} posX
     * @param {number} posY
     */
    render(sketch, scale, posX, posY)
    {
        Ressources.tiles[this.type].draw(sketch, posX, posY, scale, this.x, this.y, this.width, this.height, this.resWidth, this.resHeight);
    }
}
Tile.tiles = {};
Tile.collection = {};
/**
 * 
 * @param {string} type
 * @param {string} name
 * @param {number} x
 * @param {number} y
 * @param {boolean} solid 
 * @param {number} width 
 * @param {number} height 
 * @param {number} border_size
 */
Tile.Create = function(type, name, x, y, solid = false, width = 1, height = 1, border = BORDER_NONE, border_size = 0.5)
{
    new Tile(type, name, x, y, solid, width, height, border, border_size);
};

function load()
{
    for (let i = 1; i <= 2; i++)
    {
        Tile.Create(`grassland_${i}`, 'grass', 1, 2, false, 1, 1);
        Tile.Create(`grassland_${i}`, 'dirt', 1, 0, true, 1, 1);
        Tile.Create(`grassland_${i}`, 'grass_t_l_dirt', 0, 1, false, 1, 1, BORDER_TOP_LEFT);
        Tile.Create(`grassland_${i}`, 'grass_m_l_dirt', 0, 2, false, 1, 1, BORDER_LEFT);
        Tile.Create(`grassland_${i}`, 'grass_b_l_dirt', 0, 3, false, 1, 1, BORDER_BOTTOM_LEFT);
        Tile.Create(`grassland_${i}`, 'grass_t_r_dirt', 2, 1, false, 1, 1, BORDER_TOP_RIGHT);
        Tile.Create(`grassland_${i}`, 'grass_m_r_dirt', 2, 2, false, 1, 1, BORDER_RIGHT);
        Tile.Create(`grassland_${i}`, 'grass_b_r_dirt', 2, 3, false, 1, 1, BORDER_BOTTOM_RIGHT);
        Tile.Create(`grassland_${i}`, 'grass_t_m_dirt', 1, 1, false, 1, 1, BORDER_TOP);
        Tile.Create(`grassland_${i}`, 'grass_b_m_dirt', 1, 3, false, 1, 1, BORDER_BOTTOM);
        Tile.Create(`grassland_${i}`, 'grass_m_m_dirt', 0, 0, true,  1, 1, BORDER_ALL);
        Tile.Create(`grassland_${i}`, 'dirt_m_m_grass', 2, 0, true,  1, 1, BORDER_ALL);
        Tile.Create(`grassland_${i}`, 'dirt_b_r_grass', 0, 4, true,  1, 1, BORDER_TOP_LEFT, 0.6);
        Tile.Create(`grassland_${i}`, 'dirt_b_l_grass', 1, 4, true,  1, 1, BORDER_TOP_RIGHT, 0.6);
        Tile.Create(`grassland_${i}`, 'dirt_t_r_grass', 0, 5, true,  1, 1, BORDER_BOTTOM_LEFT, 0.6);
        Tile.Create(`grassland_${i}`, 'dirt_t_l_grass', 1, 5, true,  1, 1, BORDER_BOTTOM_RIGHT, 0.6);
        Tile.Create(`grassland_${i}`, 'grass_line_v', 2, 4, false, 1, 1, BORDER_LEFT | BORDER_RIGHT);
        Tile.Create(`grassland_${i}`, 'grass_line_h', 2, 5, false, 1, 1, BORDER_TOP | BORDER_BOTTOM);
    }

    Tile.Create('grassland_3', 'light', 1, 2, false, 1, 1);
    Tile.Create('grassland_3', 'dark', 1, 0, false, 1, 1);
    Tile.Create('grassland_3', 'light_t_l_dark', 0, 1, false, 1, 1);
    Tile.Create('grassland_3', 'light_m_l_dark', 0, 2, false, 1, 1);
    Tile.Create('grassland_3', 'light_b_l_dark', 0, 3, false, 1, 1);
    Tile.Create('grassland_3', 'light_t_r_dark', 2, 1, false, 1, 1);
    Tile.Create('grassland_3', 'light_m_r_dark', 2, 2, false, 1, 1);
    Tile.Create('grassland_3', 'light_b_r_dark', 2, 3, false, 1, 1);
    Tile.Create('grassland_3', 'light_t_m_dark', 1, 1, false, 1, 1);
    Tile.Create('grassland_3', 'light_b_m_dark', 1, 3, false, 1, 1);
    Tile.Create('grassland_3', 'light_m_m_dark', 0, 0, false, 1, 1);
    Tile.Create('grassland_3', 'dark_m_m_light', 2, 0, false, 1, 1);
    Tile.Create('grassland_3', 'dark_b_r_light', 0, 4, false, 1, 1);
    Tile.Create('grassland_3', 'dark_b_l_light', 1, 4, false, 1, 1);
    Tile.Create('grassland_3', 'dark_t_r_light', 0, 5, false, 1, 1);
    Tile.Create('grassland_3', 'dark_t_l_light', 1, 5, false, 1, 1);
    Tile.Create('grassland_3', 'grass_line_v', 2, 4, false, 1, 1);
    Tile.Create('grassland_3', 'grass_line_h', 2, 5, false, 1, 1);

    Tile.Create('grassland_4', 'dirt', 1, 2, true, 1, 1);
    Tile.Create('grassland_4', 'grass', 1, 0, false, 1, 1);
    Tile.Create('grassland_4', 'dirt_t_l_grass', 0, 1, true, 1, 1, BORDER_TOP_LEFT);
    Tile.Create('grassland_4', 'dirt_m_l_grass', 0, 2, true, 1, 1, BORDER_LEFT);
    Tile.Create('grassland_4', 'dirt_b_l_grass', 0, 3, true, 1, 1, BORDER_BOTTOM_LEFT);
    Tile.Create('grassland_4', 'dirt_t_r_grass', 2, 1, true, 1, 1, BORDER_TOP_RIGHT);
    Tile.Create('grassland_4', 'dirt_m_r_grass', 2, 2, true, 1, 1, BORDER_RIGHT);
    Tile.Create('grassland_4', 'dirt_b_r_grass', 2, 3, true, 1, 1, BORDER_BOTTOM_RIGHT);
    Tile.Create('grassland_4', 'dirt_t_m_grass', 1, 1, true, 1, 1, BORDER_TOP);
    Tile.Create('grassland_4', 'dirt_b_m_grass', 1, 3, true, 1, 1, BORDER_BOTTOM);
    Tile.Create('grassland_4', 'dirt_m_m_grass', 0, 0, true, 1, 1, BORDER_ALL);
    Tile.Create('grassland_4', 'grass_m_m_dirt', 2, 0, false, 1, 1, BORDER_ALL);
    Tile.Create('grassland_4', 'grass_b_r_dirt', 0, 4, false, 1, 1, BORDER_TOP_LEFT);
    Tile.Create('grassland_4', 'grass_b_l_dirt', 1, 4, false, 1, 1, BORDER_TOP_RIGHT);
    Tile.Create('grassland_4', 'grass_t_r_dirt', 0, 5, false, 1, 1, BORDER_BOTTOM_LEFT);
    Tile.Create('grassland_4', 'grass_t_l_dirt', 1, 5, false, 1, 1, BORDER_BOTTOM_RIGHT);
    Tile.Create('grassland_4', 'grass_line_v', 2, 4, false, 1, 1, BORDER_LEFT | BORDER_RIGHT);
    Tile.Create('grassland_4', 'grass_line_h', 2, 5, false, 1, 1, BORDER_TOP | BORDER_BOTTOM);

    Tile.Create('iceland', 'snow', 1, 2, false, 1, 1);
    Tile.Create('iceland', 'ice', 1, 0, true, 1, 1);
    Tile.Create('iceland', 'snow_t_l_ice', 0, 1, false, 1, 1, BORDER_TOP_LEFT);
    Tile.Create('iceland', 'snow_m_l_ice', 0, 2, false, 1, 1, BORDER_LEFT);
    Tile.Create('iceland', 'snow_b_l_ice', 0, 3, false, 1, 1, BORDER_BOTTOM_LEFT);
    Tile.Create('iceland', 'snow_t_r_ice', 2, 1, false, 1, 1, BORDER_TOP_RIGHT);
    Tile.Create('iceland', 'snow_m_r_ice', 2, 2, false, 1, 1, BORDER_RIGHT);
    Tile.Create('iceland', 'snow_b_r_ice', 2, 3, false, 1, 1, BORDER_BOTTOM_RIGHT);
    Tile.Create('iceland', 'snow_t_m_ice', 1, 1, false, 1, 1, BORDER_TOP);
    Tile.Create('iceland', 'snow_b_m_ice', 1, 3, false, 1, 1, BORDER_BOTTOM);
    Tile.Create('iceland', 'snow_m_m_ice', 0, 0, false,  1, 1);
    Tile.Create('iceland', 'ice_m_m_snow', 2, 0, true,  1, 1, BORDER_ALL);
    Tile.Create('iceland', 'ice_b_r_snow', 0, 4, true, 1, 1, BORDER_TOP_LEFT, 0.6);
    Tile.Create('iceland', 'ice_b_l_snow', 1, 4, true, 1, 1, BORDER_TOP_RIGHT, 0.6);
    Tile.Create('iceland', 'ice_t_r_snow', 0, 5, true, 1, 1, BORDER_BOTTOM_LEFT, 0.6);
    Tile.Create('iceland', 'ice_t_l_snow', 1, 5, true, 1, 1, BORDER_BOTTOM_RIGHT, 0.6);


    for (let i = 1; i <= 4; i++)
    {
        const solid = [true, false, false, true][i-1];

        Tile.Create(`desert_${i}`, 'dark_m_m_light', 1, 1, solid, 1, 1);

        Tile.Create(`desert_${i}`, 'dark_dot', 3, 3, solid, 1, 1, BORDER_ALL);

        Tile.Create(`desert_${i}`, 'dark_t_l_light', 0, 0, solid, 1, 1, BORDER_TOP_LEFT);
        Tile.Create(`desert_${i}`, 'dark_m_l_light', 0, 1, solid, 1, 1, BORDER_LEFT);
        Tile.Create(`desert_${i}`, 'dark_b_l_light', 0, 2, solid, 1, 1, BORDER_BOTTOM_LEFT);
        Tile.Create(`desert_${i}`, 'dark_t_r_light', 2, 0, solid, 1, 1, BORDER_TOP_RIGHT);
        Tile.Create(`desert_${i}`, 'dark_m_r_light', 2, 1, solid, 1, 1, BORDER_RIGHT);
        Tile.Create(`desert_${i}`, 'dark_b_r_light', 2, 2, solid, 1, 1, BORDER_BOTTOM_RIGHT);
        Tile.Create(`desert_${i}`, 'dark_t_m_light', 1, 0, solid, 1, 1, BORDER_TOP);
        Tile.Create(`desert_${i}`, 'dark_b_m_light', 1, 2, solid, 1, 1, BORDER_BOTTOM);

        Tile.Create(`desert_${i}`, 'dark_v_s_light', 3, 0, solid, 1, 1, BORDER_TOP | BORDER_LEFT | BORDER_RIGHT);
        Tile.Create(`desert_${i}`, 'dark_v_m_light', 3, 1, solid, 1, 1, BORDER_LEFT | BORDER_RIGHT);
        Tile.Create(`desert_${i}`, 'dark_v_e_light', 3, 2, solid, 1, 1, BORDER_BOTTOM | BORDER_LEFT | BORDER_RIGHT);

        Tile.Create(`desert_${i}`, 'dark_h_s_light', 0, 3, solid, 1, 1, BORDER_TOP | BORDER_BOTTOM | BORDER_LEFT);
        Tile.Create(`desert_${i}`, 'dark_h_m_light', 1, 3, solid, 1, 1, BORDER_TOP | BORDER_BOTTOM);
        Tile.Create(`desert_${i}`, 'dark_h_e_light', 2, 3, solid, 1, 1, BORDER_TOP | BORDER_BOTTOM | BORDER_RIGHT);

        Tile.Create(`desert_${i}`, 'corner_1_b_r', 7, 0, !solid, 1, 1, BORDER_TOP_LEFT);
        Tile.Create(`desert_${i}`, 'corner_1_b_l', 9, 0, !solid, 1, 1, BORDER_TOP_RIGHT);
        Tile.Create(`desert_${i}`, 'corner_1_t_l', 9, 2, !solid, 1, 1, BORDER_BOTTOM_RIGHT);
        Tile.Create(`desert_${i}`, 'corner_1_t_r', 7, 2, !solid, 1, 1, BORDER_BOTTOM_LEFT);
    }


    Tile.Create('town_2', 'stone',           1, 1, false, 1, 1);
    Tile.Create('town_2', 'grass',           3, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_t_l_grass', 0, 0, false, 1, 1);
    Tile.Create('town_2', 'stone_m_l_grass', 0, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_b_l_grass', 0, 2, false, 1, 1);
    Tile.Create('town_2', 'stone_t_r_grass', 2, 0, false, 1, 1);
    Tile.Create('town_2', 'stone_m_r_grass', 2, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_b_r_grass', 2, 2, false, 1, 1);
    Tile.Create('town_2', 'stone_t_m_grass', 1, 0, false, 1, 1);
    Tile.Create('town_2', 'stone_b_m_grass', 1, 2, false, 1, 1);
    Tile.Create('town_2', 'stone_m_m_grass', 3, 0, false, 1, 1);
    Tile.Create('town_2', 'grass_m_m_stone', 3, 2, false, 1, 1);
    Tile.Create('town_2', 'corner_1_t_l',    0, 3, false, 1, 1, BORDER_TOP_LEFT);
    Tile.Create('town_2', 'corner_1_t_r',    1, 3, false, 1, 1, BORDER_TOP_RIGHT);
    Tile.Create('town_2', 'corner_1_b_l',    0, 4, false, 1, 1, BORDER_BOTTOM_LEFT);
    Tile.Create('town_2', 'corner_1_b_r',    1, 4, false, 1, 1, BORDER_BOTTOM_RIGHT);
    Tile.Create('town_2', 'corner_2_b_r',    2, 3, true,  1, 1, BORDER_BOTTOM_RIGHT, 0.6);
    Tile.Create('town_2', 'corner_2_b_l',    3, 3, true,  1, 1, BORDER_BOTTOM_LEFT, 0.6);
    Tile.Create('town_2', 'corner_2_t_r',    2, 4, true,  1, 1, BORDER_TOP_RIGHT, 0.6);
    Tile.Create('town_2', 'corner_2_t_l',    3, 4, true,  1, 1, BORDER_TOP_LEFT, 0.6);

    for (let i = 3; i <= 18; i++)
    {
        Tile.Create(`town_${i}`, 'floor',          1, 1, false, 1, 1);
        Tile.Create(`town_${i}`, 'floor_t_l_wall', 0, 0, false, 1, 1, BORDER_TOP_LEFT);
        Tile.Create(`town_${i}`, 'floor_m_l_wall', 0, 1, false, 1, 1, BORDER_LEFT);
        Tile.Create(`town_${i}`, 'floor_b_l_wall', 0, 2, false, 1, 1, BORDER_BOTTOM_LEFT);
        Tile.Create(`town_${i}`, 'floor_t_r_wall', 2, 0, false, 1, 1, BORDER_TOP_RIGHT);
        Tile.Create(`town_${i}`, 'floor_m_r_wall', 2, 1, false, 1, 1, BORDER_RIGHT);
        Tile.Create(`town_${i}`, 'floor_b_r_wall', 2, 2, false, 1, 1, BORDER_BOTTOM_RIGHT);
        Tile.Create(`town_${i}`, 'floor_t_m_wall', 1, 0, false, 1, 1, BORDER_TOP);
        Tile.Create(`town_${i}`, 'floor_b_m_wall', 1, 2, false, 1, 1, BORDER_BOTTOM);
        Tile.Create(`town_${i}`, 'floor_m_m_wall', 3, 0, true,  1, 1, BORDER_ALL);
        Tile.Create(`town_${i}`, 'wall_m_m_floor', 3, 2, true,  1, 1, BORDER_ALL);
        Tile.Create(`town_${i}`, 'corner_1_t_l',   3, 4, true,  1, 1, BORDER_BOTTOM_LEFT,  0.6);
        Tile.Create(`town_${i}`, 'corner_1_t_r',   2, 4, true,  1, 1, BORDER_BOTTOM_RIGHT, 0.6);
        Tile.Create(`town_${i}`, 'corner_1_b_l',   3, 3, true,  1, 1, BORDER_TOP_RIGHT,    0.6);
        Tile.Create(`town_${i}`, 'corner_1_b_r',   2, 3, true,  1, 1, BORDER_TOP_LEFT,     0.6);
        Tile.Create(`town_${i}`, 'corner_2_t_l',   1, 4, true,  1, 1, BORDER_BOTTOM_LEFT,  0.6);
        Tile.Create(`town_${i}`, 'corner_2_t_r',   0, 4, true,  1, 1, BORDER_BOTTOM_RIGHT, 0.6);
        Tile.Create(`town_${i}`, 'corner_2_b_l',   1, 3, true,  1, 1, BORDER_TOP_RIGHT,    0.6);
        Tile.Create(`town_${i}`, 'corner_2_b_r',   0, 3, true,  1, 1, BORDER_TOP_LEFT,     0.6);
    }
}
load();

export default Tile;