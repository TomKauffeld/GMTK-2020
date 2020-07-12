// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameMode from './GameMode';
import Settings from '../Settings';
import GameModeMenu from './GameModeMenu';


class GameModeEnd extends GameMode
{
    /**
     * 
     * @param {number} score 
     */
    constructor(score)
    {
        super('End');
        this.score = Math.round(score);
    }

    /**
     * 
     * @param {p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (sketch.keyIsPressed)
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
        sketch.textSize(scale);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(`Score : ${this.score}`, width / 2 * scale, height / 2 * scale);
    }
}


export default GameModeEnd;