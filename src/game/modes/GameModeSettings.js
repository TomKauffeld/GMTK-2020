// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameMode from './GameMode';

class GameModeSettings extends GameMode
{
    constructor()
    {
        super('Settings');
        this.buttons = {};
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game} game
     */
    load(sketch, game)
    {
        super.load(sketch, game);
    }


    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     */
    unload(sketch)
    {
        super.unload(sketch);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     * @param {number} width
     * @param {number} height
     */
    render(sketch, scale, width, height)
    {
        super.render(sketch, scale, width, height);
    }
}


export default GameModeSettings;