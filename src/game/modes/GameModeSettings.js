// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import GameMode from './GameMode';
import GameModeButtons from './GameModeButtons';
import GameModeMenu from './GameModeMenu';

class GameModeSettings extends GameModeButtons
{
    /**
     * 
     * @param {GameMode} previous 
     */
    constructor(previous = null)
    {
        super('Settings', ['Return to menu']);
        this.previous = previous;
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
            this.setGameMode(this.previous);
        }
    }

    /**
     * 
     * @param {string} button 
     */
    onClick(button)
    {
        super.onClick(button);
        switch(button)
        {
        case 'return to menu':
            this.setGameMode(new GameModeMenu());
            break;
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
    }
}


export default GameModeSettings;