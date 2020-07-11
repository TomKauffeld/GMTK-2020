// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
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
     */
    constructor(type, name, x, y, solid = false, width = 1, height = 1, border = BORDER_NONE)
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
        const border = 0.4;
        if (isFlagSet(this.border, BORDER_LEFT) && x < border)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_RIGHT) && x > this.width - border)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_TOP) && y < border)
        {
            return !this.solid;
        }
        else if (isFlagSet(this.border, BORDER_BOTTOM) && y > this.height - border)
        {
            return !this.solid;
        }
        else
        {
            return this.solid;
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
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
 */
Tile.Create = function(type, name, x, y, solid = false, width = 1, height = 1, border = BORDER_NONE)
{
    new Tile(type, name, x, y, solid, width, height, border);
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
    Tile.Create('grassland_3', 'light_m_m_dark', 0, 0, false,  1, 1);
    Tile.Create('grassland_3', 'dark_m_m_light', 2, 0, false,  1, 1);

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
    Tile.Create('grassland_4', 'dirt_m_m_grass', 0, 0, true,  1, 1, BORDER_ALL);
    Tile.Create('grassland_4', 'grass_m_m_dirt', 2, 0, true,  1, 1, BORDER_ALL);

    Tile.Create('town_2', 'stone', 1, 2, false, 1, 1);
    Tile.Create('town_2', 'grass', 1, 0, false, 1, 1);
    Tile.Create('town_2', 'stone_t_l_grass', 0, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_m_l_grass', 0, 2, false, 1, 1);
    Tile.Create('town_2', 'stone_b_l_grass', 0, 3, false, 1, 1);
    Tile.Create('town_2', 'stone_t_r_grass', 2, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_m_r_grass', 2, 2, false, 1, 1);
    Tile.Create('town_2', 'stone_b_r_grass', 2, 3, false, 1, 1);
    Tile.Create('town_2', 'stone_t_m_grass', 1, 1, false, 1, 1);
    Tile.Create('town_2', 'stone_b_m_grass', 1, 3, false, 1, 1);
    Tile.Create('town_2', 'stone_m_m_grass', 0, 0, false,  1, 1);
    Tile.Create('town_2', 'grass_m_m_stone', 2, 0, false,  1, 1);

    for (let i = 3; i <= 18; i++)
    {
        Tile.Create(`town_${i}`, 'floor', 1, 2, false, 1, 1);
        Tile.Create(`town_${i}`, 'floor_t_l_wall', 0, 1, false, 1, 1, BORDER_TOP_LEFT);
        Tile.Create(`town_${i}`, 'floor_m_l_wall', 0, 2, false, 1, 1, BORDER_LEFT);
        Tile.Create(`town_${i}`, 'floor_b_l_wall', 0, 3, false, 1, 1, BORDER_BOTTOM_LEFT);
        Tile.Create(`town_${i}`, 'floor_t_r_wall', 2, 1, false, 1, 1, BORDER_TOP_RIGHT);
        Tile.Create(`town_${i}`, 'floor_m_r_wall', 2, 2, false, 1, 1, BORDER_RIGHT);
        Tile.Create(`town_${i}`, 'floor_b_r_wall', 2, 3, false, 1, 1, BORDER_BOTTOM_RIGHT);
        Tile.Create(`town_${i}`, 'floor_t_m_wall', 1, 1, false, 1, 1, BORDER_TOP);
        Tile.Create(`town_${i}`, 'floor_b_m_wall', 1, 3, false, 1, 1, BORDER_BOTTOM);
        Tile.Create(`town_${i}`, 'floor_m_m_wall', 0, 0, true,  1, 1, BORDER_ALL);
        Tile.Create(`town_${i}`, 'wall_m_m_floor', 2, 0, true,  1, 1, BORDER_ALL);
    }
}
load();

export default Tile;