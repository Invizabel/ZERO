let storage = require("storage");
let free = storage.fsInfo("/ext")["freeSpace"];
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
for (let i = 0; i < free; i += 1)
{
    file.write("0");
}
file.close();
print("REMOVING CHAFF");
storage.remove("/ext/CHAFF");
print("DONE!");
