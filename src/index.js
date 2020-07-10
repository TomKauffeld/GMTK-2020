import p5 from 'p5';

/**
 * 
 * @param {p5} sketch 
 */
function s(sketch)
{
    let x = 5;
    let y = 5;
    
    sketch.setup = () => {
        const sk = document.getElementById('sketch');
        sketch.createCanvas(sk.clientWidth / 2, sk.clientHeight / 2);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x,y,50,50);
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