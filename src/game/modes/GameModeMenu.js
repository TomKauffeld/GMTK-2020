// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameMode from './GameMode';
import GameModePlay from './GameModePlay';
import GameModeSettings from './GameModeSettings';

class GameModeMenu extends GameMode
{
    constructor()
    {
        super('Menu');
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
     * @param {string} button 
     */
    loadButton(sketch, button)
    {
        this.buttons[button.toLowerCase()] = {
            normal: sketch.loadImage(`/res/Button_${button}.png`),
            highlight:  sketch.loadImage(`/res/Button_${button}_Highlighted.png`),
            selected:  sketch.loadImage(`/res/Button_${button}_Selected.png`),
        };
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game} game
     */
    load(sketch, game)
    {
        super.load(sketch, game);
        this.loadButton(sketch, 'Play');
        this.loadButton(sketch, 'Settings');
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} button 
     */
    onClick(sketch, button)
    {
        switch(button)
        {
        case 'play':
            this.setGameMode(sketch, new GameModePlay());
            break;
        case 'settings':
            this.setGameMode(sketch, new GameModeSettings());
            break;
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     */
    unload(sketch)
    {
        super.unload(sketch);
    }
    
    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} width
     * @param {number} height
     * @param {string} button
     * @param {number} posX
     * @param {number} posY
     * @param {number} size
     */
    drawButton(sketch, width, height, button, posX, posY, size = 1)
    {
        button = button.toLowerCase();
        const scale = width / 3;
        const w = scale * size;
        const h = w / 2.6;
        const x = posX * scale + width / 2 - w / 2;
        const y = posY * scale / 2.6 + height / 2 - h / 2;
        let image = null;
        if (sketch.mouseX >= x && sketch.mouseX <= x + w && sketch.mouseY >= y && sketch.mouseY <= y + h)
        {
            if (sketch.mouseIsPressed)
            {
                image = this.buttons[button].selected;
                this.onClick(sketch, button);
            }
            else
            {
                image = this.buttons[button].highlight;
            }
        }
        else
        {
            image = this.buttons[button].normal;
        }
        if (image !== null)
        {
            sketch.image(image, x, y, w, h);
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
        this.drawButton(sketch, width * scale, height * scale, 'play', 0, -0.75);
        this.drawButton(sketch, width * scale, height * scale, 'settings', 0, +0.75);
    }
}


export default GameModeMenu;