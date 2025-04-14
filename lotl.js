let math = require("math");

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

function split(data,value)
{
    let hits = "";
    let results = [];
    for (let i = 0; i < data.length; i++)
    {
        if (data[i] === value && hits !== "")
        {
            results.push(hits);
            hits = "";
        }
        else
        {
            hits += data[i];
        }
    }
    if (hits !== "")
    {
        results.push(hits);
    }
    return results;
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

// Examples
print(any(flatten_array([[[false],[false],[false]],[[false],[true],[false]]]))); // true
print(all(flatten_array([[[true],[true],[true]],[[true],[true],[false]]]))); // false
print(mean(flatten_array([[[1],[2],[3]],[[4],[5],[6]]]))); // 3.5
print("{" + split("bb{1:2}","{")[1]); // {1:2}
