// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Table as p5Table, TableRow} from 'p5';

import Table from '../Table';


/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch) {
    for(let i = 1; i <= 3; i++)
    {
        sketch.loadStrings(`res/worlds/world_${i}.csv`, (lines) => {
            const t = new p5Table();
            for (let i = 0; i < lines.length; i++)
            {
                if (t.getColumnCount() < 1)
                {
                    const c = lines[i].replace('","', '').split(',');
                    for (let j = 0; j < c.length; j++)
                    {
                        t.addColumn(j + 1);
                    }
                }
                if (lines[i].length > 0)
                {
                    const row = new TableRow(lines[i], ',');
                    t.addRow(row);
                }
            }
            const table = new Table();
            for(let y = 0; y < t.getRowCount(); y++)
            {
                for (let x = 0; x < t.getColumnCount(); x++)
                {
                    const l = t.get(y, x);
                    table.setName(x, y, l.trim());
                }
            }
            Worlds[`world_${i}`] = table;
        });
    }
    return Worlds;
}


const Worlds = {
    load,
    /**
     * @type Table
     */
    world_1: null,
    /**
     * @type Table
     */
    world_2: null,
    /**
     * @type Table
     */
    world_3: null,
};

export default Worlds;