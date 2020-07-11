// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameMode from './GameMode';
import World from '../World';
import GameModeSettings from './GameModeSettings';

class GameModePlay extends GameMode
{
    constructor()
    {
        super('Game');
        this.world = new World(1);
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (sketch.keyIsDown(sketch.ESCAPE))
        {
            this.setGameMode(new GameModeSettings(this));
        }
        else
        {
            this.world.tick(sketch, time);
        }
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
        this.world.render(sketch, scale, width, height);
    }
}


export default GameModePlay;