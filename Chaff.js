let chaff = "";
for (let i = 0; i <= 1024; i++)
{
    chaff += "0"; 
}
let storage = require("storage");
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
while (true)
{
    let free = storage.fsInfo("/ext")["freeSpace"];
    if (free > 1023)
    {
        file.write(chaff);
    }
    
    else
    {
        break
    }
}
file.close();
print("REMOVING CHAFF");
storage.remove("/ext/CHAFF");
print("DONE!");
