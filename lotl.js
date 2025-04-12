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
            return true
        }
    }
    return false;
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

print(any([false,false,true]));
print(any([false,false,false]));
print(all([false,false,true]));
print(all([false,false,false]));
print(all([true,true,true]));
print(mean([1,2,3]));
