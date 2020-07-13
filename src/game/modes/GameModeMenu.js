// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameModeButtons from './GameModeButtons';
import GameModePlay from './GameModePlay';
import GameModeSettings from './GameModeSettings';
import GameModeEdit from './GameModeEdit';
import GameModeHelp from './GameModeHelp';
import GameModeCredits from './GameModeCredits';
import Ressources from '../../gfx/Ressources';

class GameModeMenu extends GameModeButtons
{
    constructor()
    {
        super('Menu', ['Play', 'Settings', 'Help', 'Edit', 'Credits']);
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
        case 'credits':
            this.setGameMode(new GameModeCredits());
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
        const image = Ressources.ui.title;
        const res = image.height / image.width;
        let h = this.firstButton * 0.8;
        let w = h / res;
        if (w > width * scale * 0.9)
        {
            w = width * scale * 0.9;
            h = w * res;
        }
        const x = width / 2 * scale - w/2;
        const y = (this.firstButton - h) / 2;
        sketch.image(image, x, y, w, h);
    }
}


export default GameModeMenu;