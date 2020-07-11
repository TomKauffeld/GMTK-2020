// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import GameMode from './modes/GameMode';



class Game
{
    /**
     * 
     * @param {GameMode} gamemode 
     */
    constructor(gamemode = null)
    {
        this.gamemode = gamemode;
        this.newKey = true;
        this.newMouse = true;
        this.newGamemode = undefined;
    }

    /**
     * 
     * @param {GameMode} gamemode 
     */
    setGameMode(gamemode = null)
    {
        if (this.newGamemode !== undefined)
        {
            return;
        }
        this.newGamemode = gamemode;
        if (typeof gamemode.render !== 'function')
        {
            throw new Error();
        }
        this.newKey = true;
        this.newMouse = true;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        if (this.newKey || this.newMouse)
        {
            this.newKey =  sketch.keyIsPressed;
            this.newMouse =  sketch.mouseIsPressed;
        }
        else if (this.newGamemode !== undefined)
        {
            this.gamemode = this.newGamemode;
            this.newGamemode = undefined;
        }
        else if (this.gamemode !== null)
        {
            this.gamemode.game = this;
            this.gamemode.tick(sketch, time);
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
        if (this.gamemode !== null)
        {
            this.gamemode.game = this;
            if (typeof this.gamemode.render === 'function')
            {
                this.gamemode.render(sketch, scale, width, height);
            }
        }
    }
}


export default Game;