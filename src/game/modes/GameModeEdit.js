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
            if (tile !== null)
            {
                if (typeof this.tiles[x] === 'undefined')
                {
                    this.tiles[x] = {};
                }
                this.tiles[x][y] = `${tile.type}:${tile.name}`;
            }
            else
            {
                if (typeof this.tiles[x] !== 'undefined')
                {
                    if (typeof this.tiles[x][y] !== 'undefined')
                    {
                        this.tiles[x][y] = undefined;
                        delete this.tiles[x][y];
                    }
                    const keys = Object.keys(this.tiles[x]);
                    if (keys.length < 1)
                    {
                        this.tiles[x] = undefined;
                        delete this.tiles[x];
                    }
                }
            }
        }
    }
    /**
     * 
     * @param {number} y
     * @param {number} xa 
     * @returns {string|null}
     */
    get(y, x)
    {
        if (typeof this.tiles[x] === 'undefined')
        {
            return null;
        }
        if (typeof this.tiles[x][y] === 'undefined')
        {
            return null;
        }
        return this.tiles[x][y];
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

    export()
    {
        const maxX = this.getColumnCount();
        const maxY = this.getRowCount();
        let e = '';
        for(let y = 0; y < maxY; y++)
        {
            for (let x = 0; x < maxX; x++)
            {
                if (x > 0)
                {
                    e += ',';
                }
                const tile = this.get(y, x);
                if (tile !== null)
                {
                    e += tile;
                }
            }
            e += '\r\n';
        }
        return e;
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
        this.speed = 4;
        this.x = 0;
        this.scale = 0;
        this.lastClick = false;
        this.selectedBlock = 0;
        this.offset = {x: 0, y: 0};
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
                if (sketch.mouseX > this.x)
                {
                    if (!this.lastClick)
                    {
                        if (sketch.mouseY > 20 && sketch.mouseY < 30)
                        {
                            this.selectedType++;
                            this.selectedType %= this.types.length;
                            if (this.selectedBlock > Object.keys(Tile.collection[this.types[this.selectedType]]).length)
                            {
                                this.selectedBlock = 0;
                            }
                        }
                        else if (sketch.mouseY < 10)
                        {
                            if (sketch.mouseX - this.x < (sketch.width - this.x) / 2)
                            {
                                const data = this.table.export();
                                var blob = new Blob([data], {type: 'text/csv'});
                                if(window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveBlob(blob, 'world.csv');
                                }
                                else{
                                    var elem = window.document.createElement('a');
                                    elem.href = window.URL.createObjectURL(blob);
                                    elem.download = 'world.csv';        
                                    document.body.appendChild(elem);
                                    elem.click();        
                                    document.body.removeChild(elem);
                                }
                            }
                            else
                            {
                                const file = prompt('file');
                                const reader = new FileReader();
                                reader.onload = () => {
                                    console.log(reader.result);
                                };
                                reader.readAsText(file);
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
                                if (i <= Object.keys(Tile.collection[this.types[this.selectedType]]).length)
                                {
                                    this.selectedBlock = i;
                                }
                            }
                        }
                    }
                }
                else
                {
                    const x = Math.floor(sketch.mouseX / this.scale - this.offset.x);
                    const y = Math.floor(sketch.mouseY / this.scale - this.offset.y);
                    const keys = Object.keys(Tile.collection[this.types[this.selectedType]]);
                    if (this.selectedBlock < keys.length)
                    {
                        this.table.set(x, y, Tile.collection[this.types[this.selectedType]][keys[this.selectedBlock]]);
                    }
                    else
                    {
                        this.table.set(x, y, null);
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
                this.pos.y -= this.speed * time;
            }
            else if (this.keyIsDown(sketch, 'right'))
            {
                this.pos.x += this.speed * time;
            }
            else if (this.keyIsDown(sketch, 'down'))
            {
                this.pos.y += this.speed * time;
            }
            else if (this.keyIsDown(sketch, 'left'))
            {
                this.pos.x -= this.speed * time;
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
        this.offset = {
            x: (width - 4) / 2 - this.pos.x, //center the player on the middle of the map
            y: height / 2 - this.pos.y, //center the player on the middle of the map
        };
        this.x = (width - 4) * scale;
        sketch.push(); //save the curent display of map / player / mob
        sketch.translate(this.offset.x * scale, this.offset.y * scale); //translate all entity and map by offset

        const minX = Math.max(0, this.offset.x - width / 2);
        const minY = Math.max(0, this.offset.y - height / 2);
        const maxX = Math.min(width - this.offset.x) - 4;
        const maxY = Math.min(height - this.offset.y);
        for (let y = minY; y < maxY; y++)
        {
            for (let x = minX; x < maxX; x++)
            {
                const tile = this.getTile(x, y);
                if (x < this.table.getColumnCount() && y < this.table.getRowCount())
                {
                    sketch.stroke(0, 0, 255);
                }
                else
                {
                    sketch.stroke(255);
                }
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
        sketch.textSize(10);
        sketch.textAlign(sketch.RIGHT, sketch.BOTTOM);
        sketch.text('Import', 4 * scale, 10);
        sketch.textAlign(sketch.LEFT, sketch.BOTTOM);
        sketch.text('Export', 10, 10);
        sketch.text(`selected type : ${this.types[this.selectedType]}`, 10, 30);
        const keys = Object.keys(Tile.collection[this.types[this.selectedType]]);
        for (let i = 0; i <= keys.length; i++)
        {
            const tile = Tile.collection[this.types[this.selectedType]][keys[i]];
            
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
            if (typeof tile === 'object')
            {
                tile.render(sketch, scale, x, y);
            }
        }
        sketch.pop();
    }
}


export default GameModeEdit;