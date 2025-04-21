let furi_record_open = ffi("void* furi_record_open(char*)");
let gui_direct_draw_acquire = ffi("void* gui_direct_draw_acquire(void*)");
let gui_direct_draw_release = ffi("void gui_direct_draw_release(void*)");
let draw_line = ffi("void canvas_draw_line(void*,int,int,int,int)");
let commit = ffi("void canvas_commit(void*)");
let clear = ffi("void canvas_clear(void*)");

let Math = require("math");

function radians(data)
{
    return data * (Math.PI / 180);
}

function rotate_camera(data,axis,angle)
{
    let hits = [];
    let theta = radians(angle);
    if (axis === "x")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([data[i][0],(Math.cos(theta)*data[i][1]-Math.sin(theta)*data[i][2]),(Math.sin(theta)*data[i][1]+Math.cos(theta)*data[i][2])]);
        }
        return hits;
    }
    if (axis === "y")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([Math.cos(theta)*data[i][0]+Math.sin(theta)*data[i][2],data[i][1],-Math.sin(theta)*data[i][0]+Math.cos(theta)*data[i][2]]);
        }
        return hits;
    }
    if (axis === "z")
    {
        for (let i = 0; i < data.length; i++)
        {
            hits.push([Math.cos(theta)*data[i][0]-Math.sin(theta)*data[i][1],Math.sin(theta)*data[i][0]+Math.cos(theta)*data[i][1],data[i][2]]);
        }
        return hits;
    }
}

function project(x,y,z,focal)
{
    let screen_x = Math.floor(focal * (x / z));
    let screen_y = Math.floor(focal * (y / z));
    return [screen_x,screen_y];
}

function main()
{
    let gui = furi_record_open("gui");
    let canvas = gui_direct_draw_acquire(gui);

    let cube = [[1,1,1],[1,1,2],[1,2,1],[1,2,2],[2,1,1],[2,1,2],[2,2,1],[2,2,2]];
    let edges = [[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];
    let new_cube;

    for (let i = 0; i < 30; i++)
    {   
        clear(canvas);
        new_cube = rotate_camera(cube,"y",i);
        for (let i = 0; i < edges.length; i++)
        {
            let start = new_cube[edges[i][0]];
            let end = new_cube[edges[i][1]];
            
            let start_projected = project(start[0],start[1],start[2],20);
            let end_projected = project(end[0],end[1],end[2],20);

            draw_line(canvas,start_projected[0],start_projected[1],end_projected[0],end_projected[1]);
        }
        commit(canvas);
        delay(1/30);
    }
    gui_direct_draw_release(gui);
}

main();
