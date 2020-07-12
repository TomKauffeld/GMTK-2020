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

    store()
    {
        localStorage.setItem('gameModeEdit', JSON.stringify(this.tiles));
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} tile 
     */
    setName(x, y, tile)
    {
        if (x >= 0 && y >= 0)
        {
            if (tile !== null)
            {
                if (typeof this.tiles[x] === 'undefined')
                {
                    this.tiles[x] = {};
                }
                this.tiles[x][y] = tile;
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


Table.load = () => {
    const res = localStorage.getItem('gameModeEdit');
    if (typeof res !== 'string')
    {
        return null;
    }
    const tiles = JSON.parse(res);
    const table = new Table();
    table.tiles = tiles;
    return table;
};


export default Table;