let mal = "";
for (let i = 0; i <= 1024; i++)
{
    mal += "0";
}
let storage = require("storage");
let free = storage.fsInfo("/ext")["freeSpace"];
print("CREATING CHAFF");
let file = storage.openFile("/ext/CHAFF", "w", "create_always");
for (let i = 0; i <= free; i += 1024)
{
    file.write(mal);
}
file.write(mal);
file.close();
print("REMOVING CHAFF");
storage.remove("/ext/CHAFF");
print("DONE!");
