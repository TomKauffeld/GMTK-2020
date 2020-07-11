// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import GameMode from './GameMode';
import Ressources from '../../gfx/Ressources';

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
        this.buttons = buttons;
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
     * @param {string} button 
     */
    // eslint-disable-next-line no-unused-vars
    onClick(button)
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
        const b = typeof Ressources.buttons[button] === 'object' ? Ressources.buttons[button] : null;
        let image = null;
        if (sketch.mouseX >= x && sketch.mouseX <= x + w && sketch.mouseY >= y && sketch.mouseY <= y + h)
        {
            if (sketch.mouseIsPressed)
            {
                image = b === null ? null : b.selected;
                this.onClick(button);
            }
            else
            {
                image = b === null ? null : b.highlighted;
            }
        }
        else
        {
            image = b === null ? null : b.normal;
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
     * @param {number} scale
     * @param {number} width
     * @param {number} height
     */
    render(sketch, scale, width, height)
    {
        super.render(sketch, scale, width, height);
        const h = (this.buttons.length) * 0.75;
        let y = - h / 2;
        if (this.buttons.length === 1)
        {
            y = 0;
        }
        for (let i = 0; i < this.buttons.length; i++)
        {
            this.drawButton(sketch, width * scale, height * scale, this.buttons[i], 0, y);
            y += 1.5;
        }
    }
}


export default GameModeButtons;