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
        /**
         * @type Game
         */
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
     * @param {GameMode} gameMode 
     */
    setGameMode(gameMode)
    {
        if (this.game !== null)
        {
            this.game.setGameMode(gameMode);
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