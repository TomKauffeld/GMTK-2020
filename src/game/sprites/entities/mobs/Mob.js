// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
// eslint-disable-next-line no-unused-vars
import TileSet from '../../../../gfx/TileSet';
// eslint-disable-next-line no-unused-vars
import World from '../../../World';
import Entity from '../Entity';

class Mob extends Entity
{
    /**
     * 
     * @param {World} world 
     * @param {TileSet} texture
     * @param {string} name 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} dir 
     * @param {number} maxSpeed 
     * @param {number} width 
     * @param {number} height 
     * @param {number} life
     */
    constructor(world, texture, name, posX, posY, dir, maxSpeed = 1, width = 1, height = 1 , life = 100)
    {
        super(name, posX, posY, dir, width, height);
        this.world = world;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.life = life;
        this.dead = false;
        this.attack = false;
        this.texture = texture;
        this.animation = {
            frame: 0,
            timer: 0,
            time: 0.5 / this.texture.size.x
        };
        this.oldImage = null;
    }
    /**
     * 
     * @param {number} x 
     */
    setPosX(x)
    {
        if (this.dead || this.life <= 0)
        {
            return;
        }
        this.pos.x = x;
    }

    /**
     * 
     * @param {number} y
     */
    setPosY(y)
    {
        if (this.dead || this.life <= 0)
        {
            return;
        }
        this.pos.y = y;
    }

    /**
     * 
     * @param {number} d
     */
    setPosD(d)
    {
        if (this.dead || this.life <= 0)
        {
            return;
        }
        this.pos.d = d;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        if (this.dead)
        {
            return;
        }
        const oldX = this.pos.x;
        const oldY = this.pos.y;
        this.animation.timer += time;
        if (this.animation.timer > this.animation.time)
        {
            this.animation.timer -= this.animation.time;
            this.animation.frame++;
            this.animation.frame %= this.texture.size.x;
            if (this.animation.frame >= this.texture.size.x && this.life <= 0)
            {
                console.log(`${this.name} is dead`);
                this.dead = true;
                this.animation.frame = this.texture.size.x - 1;
            }
        }
        if (this.life > 0)
        {
            switch(this.pos.d)
            {
            case 0:
                this.pos.y -= this.speed * time;
                break;
            case 1:
                this.pos.x += this.speed * time;
                break;
            case 2:
                this.pos.y += this.speed * time;
                break;
            case 3:
                this.pos.x -= this.speed * time;
            }
            if (this.world.isSolid(this.pos.x + this.width / 2, this.pos.y + this.height - 0.2))
            {
                this.pos.x = oldX;
                this.pos.y = oldY;
            }
        }
        super.tick(sketch, time);
    }

    /**
     * 
     * @param {number} damages 
     */
    takeDamages(damages)
    {
        this.life-=damages;
        if (this.life <= 0){
            this.dead = true;
            this.world.player.incrementScore(1);
        }
    }

    /**
     * 
     * @param {number} number 
     */
    addLife(number)
    {
        this.life+=number;
        if (this.life > 100){
            this.life = 100;
        }
    }

    attack()
    {
        if(this.world.player.posX == this.posX){
            this.world.player.takeDamages(2);
        }
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} scale
     */
    render(sketch, scale)
    {
        super.render(sketch, scale);
        const dir = [4, 12, 0, 8][this.pos.d];
        const ty = this.life > 0 ? (this.speed > 0 ? dir + 1 : (this.attack ? dir + 2 : dir)) : dir + 3;
        if (this.oldImage !== ty)
        {
            this.oldImage = ty;
            this.animation.timer = 0;
            this.animation.frame = 0;
        }
        const tx = this.animation.frame;
        this.texture.draw(sketch, this.pos.x, this.pos.y, scale, tx, ty, this.width, this.height);
    }
}

export default Mob;