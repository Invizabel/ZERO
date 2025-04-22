let events = require("event_loop");
let gui = require("gui");
let input = require("gui/text_input");
let dialog = require("gui/dialog");
let menu = require("gui/submenu");
let math = require("math");

function generate_passsword(n)
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

function generate()
{
    let inputView = input.makeWith({header:"Enter length",minLength:1,maxLength:2,defaultText:"16",defaultTextClear:true,});
    let result_dialog = dialog.make();
    events.subscribe(inputView.input,function (_sub,text,gui,views)
    {
        let n = parseInt(text);
        if (!isNaN(n) && n > 0)
        {
            let password = generate_passsword(n);
            print("Generated password: " + password);
            result_dialog.set("text","Password:\n" + password);
            result_dialog.set("center","Back");
            events.stop();
            gui.viewDispatcher.switchTo(result_dialog);
        }
        else
        {
            result_dialog.set("text","Invalid input.");
            result_dialog.set("center","Back");
            events.stop();
            gui.viewDispatcher.switchTo(result_dialog);
        }
    },gui);


    events.subscribe(result_dialog.input,function (_sub,button,gui)
    {
        if (button === "center")
        {
            events.stop();
            TheSilent();
        }
    },gui);
    gui.viewDispatcher.switchTo(inputView);
    events.run();
}

function TheSilent()
{
    let views = {menu: menu.makeWith({header: "TheSilent",items: ["generate""exit",],}),result_dialog: dialog.make(),};
    events.subscribe(views.menu.chosen, function (_sub, index, gui, events, views)
    {
        if (index === 0)
        {
            generate();
        }
        else
        {
            events.stop();
        }
        
    }, gui, events, views);
    gui.viewDispatcher.switchTo(views.menu);
    events.run();
}

TheSilent();
