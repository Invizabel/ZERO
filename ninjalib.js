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
    if (axis === "x")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([data[i][0],(Math.cos(theta)*data[i][1]-Math.sin(theta)*data[i][2]),(Math.sin(theta)*data[i][1]+Math.cos(theta)*data[i][2])]);
        }
        return hits;
    }
    if (axis === "y")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([Math.cos(theta)*data[i][0]+Math.sin(theta)*data[i][2],data[i][1],-Math.sin(theta)*data[i][0]+Math.cos(theta)*data[i][2]]);
        }
        return hits;
    }
    if (axis === "z")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([Math.cos(theta)*data[i][0]-Math.sin(theta)*data[i][1],Math.sin(theta)*data[i][0]+Math.cos(theta)*data[i][1],data[i][2]]);
        }
        return hits;
    }
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
