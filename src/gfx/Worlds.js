// eslint-disable-next-line no-unused-vars
import {p5InstanceExtensions, Table as p5Table, TableRow} from 'p5';

import Table from '../Table';

import world_1 from '../res/worlds/world_1.csv';
import world_2 from '../res/worlds/world_2.csv';
import world_3 from '../res/worlds/world_3.csv';


/**
 * 
 * @param {p5InstanceExtensions} sketch 
 */
function load(sketch) {
    [world_1, world_2, world_3].forEach((world, index) => 
    {
        sketch.loadStrings(world, (lines) => {
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
            Worlds[`world_${index}`] = table;
        });
    });
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