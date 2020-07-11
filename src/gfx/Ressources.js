// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import Tiles from './Tiles';
import Sprites from './Sprites';
import Worlds from './Worlds';
import Buttons from './buttons/Buttons';

/**
 * 
 * @param {p5.p5InstanceExtensions} sketch 
 */
function load(sketch) {
    Ressources.tiles.load(sketch);
    Ressources.sprites.load(sketch);
    Ressources.words.load(sketch);
    Ressources.buttons.load(sketch);
    return Ressources;
}

const Ressources = {
    load,
    tiles: Tiles,
    sprites: Sprites,
    words: Worlds,
    buttons: Buttons
};

export default Ressources;