let furi_record_open = ffi("void* furi_record_open(char*)");
let gui_direct_draw_acquire = ffi("void* gui_direct_draw_acquire(void*)");
let gui_direct_draw_release = ffi("void gui_direct_draw_release(void*)");
let draw_line = ffi("void canvas_draw_line(void*,int,int,int,int)");
let draw_str = ffi("void canvas_draw_str(void*, int, int, char*)");
let commit = ffi("void canvas_commit(void*)");
let clear = ffi("void canvas_clear(void*)");

let input = require("input");
let Math = require("math");

function mean(data)
{
    return sum(data) / data.length;
}

function radians(data)
{
    return data * (Math.PI / 180);
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

function project(x,y,z,focal)
{
    let screen_x = Math.floor(focal * (x / z));
    let screen_y = Math.floor(focal * (y / z));
    return [screen_x,screen_y];
}

function move()
{
    input.key_event(function (key, event)
    {
        if (event === input.EVENT_PRESSED)
        {
            if (key === input.KEY_OK)
            {
                print("OK button pressed");
            }
            else if (key === input.KEY_BACK)
            {
                gui_direct_draw_release(gui);
            }
            else if (key === input.KEY_UP)
            {
                print("Up button pressed");
            }
            else if (key === input.KEY_DOWN)
            {
                print("Down button pressed");
            }
            else if (key === input.KEY_LEFT)
            {
                print("Left button pressed");
            }
            else if (key === input.KEY_RIGHT)
            {
                print("Right button pressed");
            }
        }   
    });

}

function lotl()
{
    let gui = furi_record_open("gui");
    let canvas = gui_direct_draw_acquire(gui);

    let cube = [[1,1,1],[1,1,2],[1,2,1],[1,2,2],[2,1,1],[2,1,2],[2,2,1],[2,2,2]];
    let edges = [[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];
    let new_cube = [];
    for (let i = 0; i < 10; i++)
    {
        new_cube = rotate_camera(cube,"x",i*10);
        for (let i = 0; i < edges.length; i++)
        {
            let start = new_cube[edges[i][0]];
            let end = new_cube[edges[i][1]];
            
            let start_projected = project(start[0],start[1],start[2],20);
            let end_projected = project(end[0],end[1],end[2],20);

            draw_line(canvas,start_projected[0],start_projected[1],end_projected[0],end_projected[1]);
        }
        draw_str(canvas, 64, 32, "+");
        commit(canvas);
        clear(canvas);
    }
    gui_direct_draw_release(gui);
}

lotl();
