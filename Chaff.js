let storage = require("storage");
let free = storage.fsInfo("/ext")["freeSpace"];
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
while (true)
{
    if (free > 1)
    {
        file.write("0");
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
