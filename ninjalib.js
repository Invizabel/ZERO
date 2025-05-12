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

function sha1(message)
{
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;

    let new_message = "";
    
    for (let i = 0; i < message.length; i++)
    {
        new_message += "0" + message.charCodeAt(i).toString(2);
    }
    new_message += "1";

    let pad = (new_message.length - 1).toString(2);
    let pad_message = new_message;

    while (pad_message.length % 512 !== 448)
    {
        pad_message += "0";
    }
    let message_length = pad;
    while (message_length.length < 64)
    {
        message_length = "0" + message_length;
    }
    pad_message += message_length;
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

let abc = sha1("abc");
//print(abc);
