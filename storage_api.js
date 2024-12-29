let storage = require("storage");
let file = storage.openFile("/ext/js_storage_api.txt", "w", "create_always");
for (let key in storage)
{
    print(key);
    file.write(key + "\n");
    delay(2500);
}
file.close()
print("API STATS WRITTEN TO SD CARD!")
