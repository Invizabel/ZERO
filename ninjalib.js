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

function sum(data)
{
    let hits = 0;
    for (let i = 0; i < data.length; i++)
    {
        hits += data[i];
    }
    return hits;
}
