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
print(any(chain([[true,false,false],[false,false,false]]))); // true
print(all(chain([[true,true,true],[false,false,false]]))); // false
print(mean(chain([[1,2,3],[4,5,6]]))); // 3.5
