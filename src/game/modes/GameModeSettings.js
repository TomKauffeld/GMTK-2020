// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
// eslint-disable-next-line no-unused-vars
import GameMode from './GameMode';
import GameModeButtons from './GameModeButtons';
import GameModeMenu from './GameModeMenu';
import Settings from '../Settings';

class GameModeSettings extends GameModeButtons
{
    /**
     * 
     * @param {GameMode} previous 
     */
    constructor(previous = null)
    {
        super('Settings', ['Return to menu', `input mode: ${Settings.keys.mode}`]);
        this.input = `input mode: ${Settings.keys.mode}`;
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
        if (sketch.keyIsDown(Settings.keys.back))
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
        case this.input:
            if (Settings.keys.mode === 'qwerty')
            {
                Settings.setAzerty();
                this.setGameMode(new GameModeSettings(this.previous));
            }
            else
            {
                Settings.setQuerty();
                this.setGameMode(new GameModeSettings(this.previous));
            }
            try
            {
                localStorage.setItem('mode', Settings.keys.mode);
            }
            catch(error)
            {
                console.log(error);
            }
            break;
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
    }
}


export default GameModeSettings;