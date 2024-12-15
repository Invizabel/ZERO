let chaff = "";
for (let i = 0; i <= 1024; i++)
{
    chaff += "0"; 
}
let storage = require("storage");
let free = storage.fsInfo("/ext")["freeSpace"];
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
while (true)
{
    if (free > 1)
    {
        file.write(chaff);
    }
    else
    {
        break
    }
    free -= 1;
}
file.close();
print("REMOVING CHAFF");
storage.remove("/ext/CHAFF");
print("DONE!");
