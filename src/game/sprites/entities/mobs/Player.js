// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import Settings from '../../../Settings';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Mob from './Mob';

class Player extends Mob
{
    /**
     * 
     * @param {World} world
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir  
     * @param {Settings} settings
     */
    constructor(world, sketch, posX, posY, dir, settings)
    {
        super(world, 'player', posX, posY, dir, 1, 1);
        this.settings = settings;
        this.image = sketch.loadImage(`/res/sprites/mobs/player/${settings.player.sexe}_${settings.player.class}.png`);
        this.animation = {
            frame: 0,
            counter: 0
        };
        this.scale = {
            x: this.image.width / 4,
            y: this.image.height / 16
        };
        this.oldImage = null;
        this.attack = false;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {string} action 
     * @returns {boolean}
     */
    keyIsDown(sketch, action)
    {
        if (typeof this.settings.keys[action] === 'number')
        {
            return sketch.keyIsDown(this.settings.keys[action]);
        }
        return false;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        this.attack = false;
        if (this.keyIsDown(sketch, 'up'))
        {
            this.pos.d = 0;
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'right'))
        {
            this.pos.d = 1;
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'down'))
        {
            this.pos.d = 2;
            this.speed = this.maxSpeed;
        }
        else if (this.keyIsDown(sketch, 'left'))
        {
            this.pos.d = 3;
            this.speed = this.maxSpeed;
        }
        else
        {
            this.attack = this.keyIsDown(sketch, 'attack');
            this.speed = 0;
        }
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        this.scale = {
            x: this.image.width / 4,
            y: this.image.height / 16
        };
        const dir = [4, 12, 0, 8][this.pos.d];
        const ty = this.speed > 0 ? dir + 1 : (this.attack ? dir + 2 : dir);
        if (this.oldImage !== ty)
        {
            this.oldImage = ty;
            this.animation.counter = 0;
            this.animation.frame = 0;
        }
        const tx = this.animation.frame;
        const ix = tx * this.scale.x;
        const iy = ty * this.scale.y;
        sketch.image(this.image, this.pos.x * scale, this.pos.y * scale, this.width * scale, this.height * scale, ix, iy, this.scale.x, this.scale.y);
        this.animation.counter++;
        if (this.animation.counter > 10)
        {
            this.animation.counter = 0;
            this.animation.frame++;
            this.animation.frame %= 4;
        }
        super.render(sketch, scale);
    }
}

export default Player;