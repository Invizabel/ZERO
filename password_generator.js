let math = require("math");

function password_generator(n)
{
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = lowercase.toUpperCase();
    let digits = "0123456789";
    let special = "!@#$%^&*()";
    let characters = lowercase + uppercase + digits + special;
    let results = "";
    for (let i = 0; i < n; i++)
    {
        results += characters[(math.floor(math.random() * characters.length))];
    }
    return results;
}


print(password_generator(16)); // random password with length of 8
