// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameModeButtons from './GameModeButtons';
import GameModePlay from './GameModePlay';
import GameModeSettings from './GameModeSettings';

class GameModeMenu extends GameModeButtons
{
    constructor()
    {
        super('Menu', ['Play', 'Settings']);
        this.buttons = {};
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game} game
     */
    load(sketch, game)
    {
        super.load(sketch, game);
        //this.loadButton(sketch, 'Play');
        //this.loadButton(sketch, 'Settings');
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} button 
     */
    onClick(sketch, button)
    {
        super.onClick(sketch, button);
        switch(button)
        {
        case 'play':
            this.setGameMode(sketch, new GameModePlay());
            break;
        case 'settings':
            this.setGameMode(sketch, new GameModeSettings(this));
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
        //this.drawButton(sketch, width * scale, height * scale, 'play', 0, -0.75);
        //this.drawButton(sketch, width * scale, height * scale, 'settings', 0, +0.75);
    }
}


export default GameModeMenu;