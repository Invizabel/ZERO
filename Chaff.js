let chaff = "";
for (let i = 0; i <= 1024; i++)
{
    chaff += "0"; 
}
let storage = require("storage");
let free = storage.fsInfo("/ext")["freeSpace"];
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
for (let i = 0; i <= free; i++)
{
    file.write(chaff);
}
file.close();
print("REMOVING CHAFF");
storage.remove("/ext/CHAFF");
print("DONE!");
