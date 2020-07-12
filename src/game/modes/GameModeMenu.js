// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameModeButtons from './GameModeButtons';
import GameModePlay from './GameModePlay';
import GameModeSettings from './GameModeSettings';
import GameModeEdit from './GameModeEdit';
import GameModeHelp from './GameModeHelp';

class GameModeMenu extends GameModeButtons
{
    constructor()
    {
        super('Menu', ['Play', 'Settings', 'Help','Edit']);
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
     * @param {string} button 
     */
    onClick(button)
    {
        super.onClick(button);
        switch(button)
        {
        case 'play':
            this.setGameMode(new GameModePlay());
            break;
        case 'settings':
            this.setGameMode(new GameModeSettings(this));
            break;
        case 'help':
            this.setGameMode(new GameModeHelp());
            break;
        case 'edit':
            this.setGameMode(new GameModeEdit());
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


export default GameModeMenu;