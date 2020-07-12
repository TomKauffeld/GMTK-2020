// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions} from 'p5';
import GameMode from './GameMode';
import GameModeMenu from './GameModeMenu';
import Settings from '../Settings';


class GameModeHelp extends GameMode
{
    constructor()
    {
        super('Help');
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
        sketch.fill(255,255,255);
        sketch.textSize(scale);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        if ( Settings.keys.mode == 'azerty'){
            sketch.text('Move: z q s d', width/2*scale, height/2*scale-scale*1.5);
        } 
        if ( Settings.keys.mode == 'qwerty'){
            sketch.text('Move: w a s d', width/2*scale, height/2*scale-scale*1.5);
        } 
        sketch.text('Attack: SpaceBar', width/2*scale, height/2*scale);    
        sketch.text('Switch World: F', width/2*scale, height/2*scale+scale*1.5);    
    }
}


export default GameModeHelp;