let Math = require("math");

function all(data)
{
    for (let i = 0; i < data.length; i++)
    {
        if (!data[i])
        {
            return false;
        }
    }
    return true;
}

function any(data)
{
    for (let i = 0; i < data.length; i++)
    {
        if (data[i])
        {
            return true;
        }
    }
    return false;
}

function chain(data)
{
    let hits = [];
    for (let i = 0; i < data.length; i++)
    {
        for (let j = 0; j < data[i].length; j++)
        {
            hits.push(data[i][j]);
        }
    }
    return hits;
}

function flatten_array(data)
{
    while (true)
    {
        if (typeof data[0] === "array")
        {
            data = chain(data);
        }
        else
        {
            return data;
        }
    }   
}

function mean(data)
{
    return sum(data) / data.length;
}

function project(x,y,z,focal)
{
    let screen_x = Math.floor(focal * (x / z));
    let screen_y = Math.floor(focal * (y / z));
    return [screen_x, screen_y];
}

function radians(data)
{
    return data * (Math.PI / 180);
}

function rotate_camera(data,axis,angle)
{
    let hits = [];
    let theta = radians(angle);

    let center_x = [];
    let center_y = [];
    let center_z = [];
    
    for (let i = 0; i < data.length; i++)
    {
        center_x.push(data[i][0]);
        center_y.push(data[i][1]);
        center_z.push(data[i][2]);
    }

    let cx = mean(center_x);
    let cy = mean(center_y);
    let cz = mean(center_z);

    for (let i = 0; i < data.length; i++)
    {
        let x = data[i][0] - cx;
        let y = data[i][1] - cy;
        let z = data[i][2] - cz;
        
        if (axis === "x")
        {
            hits.push([cx+x,cy+Math.cos(theta)*y-Math.sin(theta)*z,cz+Math.sin(theta)*y+Math.cos(theta)*z]);
        }

        if (axis === "y")
        {
            hits.push([cx+Math.cos(theta)*x+Math.sin(theta)*z,cy+y,cz+-Math.sin(theta)*x+Math.cos(theta)*z]);
        }

        if (axis === "z")
        {
            hits.push([cx+Math.cos(theta)*x-Math.sin(theta)*y,cy+Math.sin(theta)*x+Math.cos(theta)*y,cz+z]);
        } 
    }

    return hits;
}

function sum(data)
{
    let hits = 0;
    for (let i = 0; i < data.length; i++)
    {
        hits += data[i];
    }
    return hits;
}
