// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';

class GameMode
{
    /**
     * 
     * @param {string} name 
     */
    constructor(name)
    {
        this.name = name;
        this.game = null;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    // eslint-disable-next-line no-unused-vars
    tick(sketch, time)
    {
        
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game}
     */
    load(sketch, game)
    {
        this.game = game;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     */
    // eslint-disable-next-line no-unused-vars
    unload(sketch)
    {

    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch
     * @param {GameMode} gameMode 
     */
    setGameMode(sketch, gameMode)
    {
        if (this.game !== null)
        {
            this.game.setGameMode(sketch, gameMode);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     * @param {number} width
     * @param {number} height
     */
    // eslint-disable-next-line no-unused-vars
    render(sketch, scale, width, height)
    {
    }
}


export default GameMode;