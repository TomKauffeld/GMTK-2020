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
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     */

    load(sketch)
    {
        if (this.gamemode !== null)
        {
            this.gamemode.load(sketch, this);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     */
    unload(sketch)
    {
        if (this.gamemode !== null)
        {
            this.gamemode.unload(sketch);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {GameMode} gamemode 
     */
    setGameMode(sketch, gamemode = null)
    {
        if (this.gamemode !== null)
        {
            this.gamemode.unload(sketch);
        }
        this.gamemode = gamemode;
        if (this.gamemode !== null)
        {
            console.log('gamemode : ' + gamemode.name);
            this.gamemode.load(sketch, this);
        }
        else
        {
            console.log('gamemode : N/A');
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        if (this.gamemode !== null)
        {
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
            this.gamemode.render(sketch, scale, width, height);
        }
    }
}


export default Game;