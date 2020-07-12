// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameMode from './GameMode';


class GameModeHelp extends GameMode
{
    constructor()
    {
        super('Help');
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} scale
     * @param {number} width
     * @param {number} height
     */
    render(sketch, scale, width, height)
    {
        super.render(sketch, scale, width, height);
    }
}


export default GameModeHelp;