// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameMode from './GameMode';
import GameModeMenu from './GameModeMenu';


class GameModeCredits extends GameMode
{
    constructor()
    {
        super('Credits');
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (sketch.keyIsPressed || sketch.mouseIsPressed)
        {
            this.setGameMode(new GameModeMenu());
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
        sketch.fill(255,255,255);
        sketch.textAlign(sketch.CENTER, sketch.TOP);

        sketch.textSize(scale *0.8);
        sketch.text('Credits: ', width/2*scale, scale);

        sketch.textSize(scale / 2);
        sketch.text('Main developer: ', width/2*scale, scale * 2.2);
        sketch.textSize(scale / 4);
        sketch.text('Ukhando Ithunzi', width/2*scale, scale * 3);

        sketch.textSize(scale / 2);
        sketch.text('Supporting developers: ', width/2*scale, scale * 4.2);
        sketch.textSize(scale / 4);
        sketch.text('Eavydeath', width/2*scale, scale * 5);
        sketch.text('May', width/2*scale, scale * 5.5);

        sketch.textSize(scale / 2);
        sketch.text('Designer: ', width/2*scale, scale * 6.7);
        sketch.textSize(scale / 4);
        sketch.text('TheBenAlpha', width/2*scale, scale * 7.5);
    }
}


export default GameModeCredits;