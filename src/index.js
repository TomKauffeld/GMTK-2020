import p5 from 'p5';
import Game from './game/Game';
import GameModeMenu from './game/modes/GameModeMenu';
import Settings from './game/Settings';
import Ressources from './gfx/Ressources';

/**
 * 
 * @param {p5} sketch 
 */
function s(sketch)
{
    const game = new Game(new GameModeMenu());
    const width = 10;
    const height = 10;
    const parent = document.getElementById('sketch');
    
    sketch.preload = () => {
        Ressources.load(sketch);
        try
        {
            const s = localStorage.getItem('mode');
            if (s === 'azerty')
            {
                Settings.setAzerty();
            }
            else
            {
                Settings.setQuerty();
            }
        }
        catch(error)
        {
            Settings.setQuerty();
        }
    };

    sketch.setup = () => {
        sketch.createCanvas(parent.clientWidth, parent.clientHeight);
        sketch.frameRate(60);
    };

    sketch.draw = () => {
        if (parent.clientHeight !== sketch.height || parent.clientWidth !== sketch.width)
        {
            sketch.resizeCanvas(parent.clientWidth, parent.clientHeight);
        }
        game.tick(sketch, sketch.deltaTime / 1000);
        sketch.clear();
        sketch.background(0);
        const scale = Math.min(sketch.width / width, sketch.height / height);
        game.render(sketch, scale, sketch.width / scale, sketch.height / scale);
    };
}

function fn()
{
    // eslint-disable-next-line no-unused-vars
    const myp5 = new p5(s, 'sketch');
}

if (typeof document.addEventListener === 'function')
{
    document.addEventListener('DOMContentLoaded', fn, false);
}
else if (typeof window.addEventListener === 'function')
{
    window.addEventListener('load', fn, false );
}
else if (typeof document.attachEvent === 'function')
{
    document.attachEvent('onreadystatechange', fn);
}
else if (typeof window.attachEvent === 'function')
{
    window.attachEvent('onload', fn);
}
else
{
    fn();
}