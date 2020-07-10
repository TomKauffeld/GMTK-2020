// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Game from '../Game';
import GameMode from './GameMode';
import Player from '../sprites/entities/mobs/Player';
import Settings from '../Settings';

class GameModeSettings extends GameMode
{
    constructor()
    {
        super('Game');
        this.player = null;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (this.player !== null)
        {
            this.player.tick(sketch, time);
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
        this.player = new Player(sketch, 1, 1, 2, new Settings());
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
     * @param {number} scale
     * @param {number} width
     * @param {number} height
     */
    render(sketch, scale, width, height)
    {
        super.render(sketch, scale, width, height);
        if (this.player !== null)
        {
            this.player.render(sketch, scale);
        }
    }
}


export default GameModeSettings;