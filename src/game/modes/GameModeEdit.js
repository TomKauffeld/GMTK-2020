// eslint-disable-next-line no-unused-vars
import p5 from 'p5';
import GameMode from './GameMode';
import Settings from '../Settings';
import GameModeMenu from './GameModeMenu';
import Tile from '../Tile';



class Table
{
    constructor()
    {
        this.tiles = {};
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Tile} tile 
     */
    set(x, y, tile)
    {
        if (x >= 0 && y >= 0)
        {
            if (typeof this.tiles[x] === 'undefined')
            {
                this.tiles[x] = {};
            }
            this.tiles[x][y] = `${tile.type}:${tile.name}`;
        }
    }
    getColumnCount()
    {
        const keysX = Object.keys(this.tiles);
        let max = -1;
        for (let x = 0; x < keysX.length; x++)
        {
            const n = Number.parseInt(keysX[x]);
            if (n > max)
            {
                max = n;
            }
        }
        return max + 1;
    }
    getRowCount()
    {
        const keysX = Object.keys(this.tiles);
        let max = -1;
        for (let x = 0; x < keysX.length; x++)
        {
            const keysY = Object.keys(this.tiles[keysX[x]]);
            for (let y = 0; y < keysY.length; y++)
            {
                const n = Number.parseInt(keysY[y]);
                if (n > max)
                {
                    max = n;
                }
            }
        }
        return max + 1;
    }
}

class GameModeEdit extends GameMode
{
    constructor()
    {
        super('Game');
        this.settings = new Settings();
        this.table = new Table();
        this.pos = {x: 5, y: 5};
        this.types = Object.keys(Tile.collection);
        this.selectedType = 0;
        this.x = 0;
        this.scale = 0;
        this.lastClick = false;
        this.selectedBlock = 0;
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
     */
    isPressed(sketch)
    {
        return sketch.mouseIsPressed && sketch.mouseButton === sketch.LEFT;
    }

    /**
     * 
     * @param {p5.p5InstanceExtensions} sketch 
     * @param {number} time 
     */
    tick(sketch, time)
    {
        super.tick(sketch, time);
        if (sketch.keyIsDown(sketch.ESCAPE))
        {
            this.setGameMode(new GameModeMenu());
        }
        else
        {
            if (this.isPressed(sketch) && this.scale > 0)
            {
                if (!this.lastClick)
                {
                    if (sketch.mouseX > this.x)
                    {
                        if (sketch.mouseY < 10)
                        {
                            this.selectedType++;
                            this.selectedType %= this.types.length;
                            if (this.selectedBlock >= Object.keys(Tile.collection[this.types[this.selectedType]]).length)
                            {
                                this.selectedBlock = 0;
                            }
                        }
                        else
                        {
                            const x = Math.floor((sketch.mouseX - this.x) / this.scale) - 1;
                            const y = Math.floor(sketch.mouseY / this.scale) - 1;
                            const maxY = Math.floor(sketch.height / this.scale) - 2;
                            if (x >= 0 && y >= 0 && y < Math.floor(sketch.height / this.scale) - 2)
                            {
                                const i = y + x * maxY;
                                if (i < Object.keys(Tile.collection[this.types[this.selectedType]]).length)
                                {
                                    this.selectedBlock = i;
                                }
                            }
                        }
                    }
                }
                this.lastClick = true;
            }
            else
            {
                this.lastClick = false;
            }
            if (this.keyIsDown(sketch, 'up'))
            {
                this.pos.y -= 2 * time;
            }
            else if (this.keyIsDown(sketch, 'right'))
            {
                this.pos.x += 2 * time;
            }
            else if (this.keyIsDown(sketch, 'down'))
            {
                this.pos.y += 2 * time;
            }
            else if (this.keyIsDown(sketch, 'left'))
            {
                this.pos.x -= 2 * time;
            }
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Tile|null}
     */
    getTile(x, y) //check the tile needed
    {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || y < 0 || x >= this.table.getColumnCount() || y >= this.table.getRowCount())
        {
            return null;
        }
        else
        {
            let r = this.table.get(y, x);
            if (typeof r === 'string' && typeof Tile.tiles[r] === 'object')
            {
                return Tile.tiles[r];
            }
            else
            {
                return null;
            }
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
        this.scale = scale;
        super.render(sketch, scale, width, height);
        const offset = {
            x: (width - 4) / 2 - this.pos.x, //center the player on the middle of the map
            y: height / 2 - this.pos.y, //center the player on the middle of the map
        };
        this.x = (width - 4) * scale;
        sketch.push(); //save the curent display of map / player / mob
        sketch.translate(offset.x * scale, offset.y * scale); //translate all entity and map by offset

        const minX = Math.max(0, offset.x - width / 2);
        const minY = Math.max(0, offset.y - height / 2);
        const maxX = Math.min(width - offset.x) - 4;
        const maxY = Math.min(height - offset.y);
        for (let y = minY; y < maxY; y++)
        {
            for (let x = minX; x < maxX; x++)
            {
                const tile = this.getTile(x, y);
                sketch.stroke(255);
                sketch.noFill();
                sketch.square(Math.floor(x) * scale, Math.floor(y) * scale, scale);
                if (tile !== null)
                {
                    tile.render(sketch, scale, Math.floor(x), Math.floor(y));
                }
            }
        }
        sketch.pop(); //apply the translation
        sketch.push();
        sketch.translate(this.x, 0);
        sketch.fill(0);
        sketch.rect(0, 0, 4 * scale, height * scale);
        sketch.fill(255);
        sketch.text(`selected type : ${this.types[this.selectedType]}`, 10, 10);
        const keys = Object.keys(Tile.collection[this.types[this.selectedType]]);
        for (let i = 0; i < keys.length; i++)
        {
            const tile = Tile.collection[this.types[this.selectedType]][keys[i]];
            if (typeof tile === 'object')
            {
                const x = Math.floor(i  / (height - 2)) + 1;
                const y = i % (height - 2) + 1;
                if (this.selectedBlock === i)
                {
                    sketch.stroke(0, 0, 255);
                }
                else
                {
                    sketch.stroke(255);
                }
                sketch.strokeWeight(4);
                sketch.noFill();
                sketch.square(x * scale, y * scale, scale);
                tile.render(sketch, scale, x, y);
            }
        }
        sketch.pop();
    }
}


export default GameModeEdit;