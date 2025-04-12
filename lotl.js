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
    let hits = 0;
    for (let i = 0; i < data.length; i++)
    {
        hits += data[i];
    }
    return hits / data.length;
}

// Examples
print(any(flatten_array([[[true],[false],[false]],[[false],[false],[false]]]))); // true
print(all(flatten_array([[[true],[true],[true]],[[false],[false],[false]]]))); // false
print(mean(flatten_array([[[1],[2],[3]],[[4],[5],[6]]]))); // 3.5
