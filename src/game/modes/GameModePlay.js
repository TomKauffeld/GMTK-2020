// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameMode from './GameMode';
import World from '../World';
import GameModeSettings from './GameModeSettings';

class GameModePlay extends GameMode
{
    constructor()
    {
        super('Game');
        this.world = null;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (sketch.keyIsDown(sketch.ESCAPE))
        {
            this.setGameMode(sketch, new GameModeSettings(this));
        }
        else if (this.world !== null)
        {
            this.world.tick(sketch, time);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game} game
     */
    load(sketch, game)
    {
        super.load(sketch, game);
        if (this.world === null)
        {
            this.world = new World(sketch, 1);
        }
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
        if (this.world !== null)
        {
            this.world.render(sketch, scale, width, height);
        }
    }
}


export default GameModePlay;