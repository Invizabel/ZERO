let math = require("math");
function mean(data)
{
    let hits = 0;
    for (let i = 0; i < data.length; i++)
    {
        hits += data[i];
    }
    return hits / data.length;
}
print(mean([1,2,3]));
print(mean([1,2,3,5]));
print(mean([3,1,4,1,5]));