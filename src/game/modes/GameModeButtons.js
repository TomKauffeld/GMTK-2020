// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameMode from './GameMode';

class GameModeButtons extends GameMode
{
    /**
     * 
     * @param {string} name 
     * @param {string[]} buttons;
     */
    constructor(name, buttons = [])
    {
        super(name);
        this.buttons = {};
        this.buttonNames = buttons;
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
            normal: sketch.loadImage(`/res/buttons/Button_${button}.png`, () => {}, () => this.buttons[button.toLowerCase()] = undefined),
            highlight:  sketch.loadImage(`/res/buttons/Button_${button}_Highlighted.png`, () => {}, () => this.buttons[button.toLowerCase()] = undefined),
            selected:  sketch.loadImage(`/res/buttons/Button_${button}_Selected.png`, () => {}, () => this.buttons[button.toLowerCase()] = undefined),
        };
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} button 
     */
    onClick(sketch, button)
    {
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
                image = typeof this.buttons[button] === 'object' ? this.buttons[button].selected : null;
                this.onClick(sketch, button);
            }
            else
            {
                image = typeof this.buttons[button] === 'object' ? this.buttons[button].highlight : null;
            }
        }
        else
        {
            image = typeof this.buttons[button] === 'object' ? this.buttons[button].normal : null;
        }
        if (image !== null)
        {
            sketch.image(image, x, y, w, h);
        }
        else
        {
            this.drawButton(sketch, width, height, 'none', posX, posY, size);
            sketch.fill(255);
            sketch.stroke(0);
            sketch.strokeWeight(4);
            sketch.textAlign(sketch.CENTER, sketch.CENTER);
            sketch.textSize(h * 0.5);
            let tw = sketch.textWidth(button);
            if (tw > w * 0.7)
            {
                sketch.textSize(h * 0.5 * w * 0.7 / tw);
            }
            sketch.text(button, x + w / 2, y + h / 2);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {Game} game
     */
    load(sketch, game)
    {
        super.load(sketch, game);
        this.loadButton(sketch, 'None');
        for (let i = 0; i < this.buttonNames.length; i++)
        {
            this.loadButton(sketch, this.buttonNames[i]);
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
        const h = (this.buttonNames.length) * 0.75;
        let y = - h / 2;
        if (this.buttonNames.length === 1)
        {
            y = 0;
        }
        for (let i = 0; i < this.buttonNames.length; i++)
        {
            this.drawButton(sketch, width * scale, height * scale, this.buttonNames[i], 0, y);
            y += 1.5;
        }
    }
}


export default GameModeButtons;