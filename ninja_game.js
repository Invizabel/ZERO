let furi_record_open = ffi("void* furi_record_open(char*)");
let gui_direct_draw_acquire = ffi("void* gui_direct_draw_acquire(void*)");
let gui_direct_draw_release = ffi("void gui_direct_draw_release(void*)");
//let canvas_draw_dot = ffi("void canvas_draw_dot(void*, int, int)");
let canvas_draw_line = ffi("void canvas_draw_line(void*, int, int, int, int)");
let canvas_commit = ffi("void canvas_commit(void*)");

let Math = require("math");

function project(x,y,z,focal)
{
    let screen_x = Math.floor(focal * (x / z));
    let screen_y = Math.floor(focal * (y / z));
    return [screen_x, screen_y];
}

function main()
{
    let gui = furi_record_open("gui");
    let canvas = gui_direct_draw_acquire(gui);

    let cube = [[1,1,1],[1,1,2],[1,2,1],[1,2,2],[2,1,1],[2,1,2],[2,2,1],[2,2,2]];
    let edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    
    for (let i = 0; i < edges.length; i++)
    {
        let start = cube[edges[i][0]];
        let end = cube[edges[i][1]];
        
        let start_projected = project(start[0], start[1], start[2], 20);
        let end_projected = project(end[0], end[1], end[2], 20);

        canvas_draw_line(canvas, start_projected[0], start_projected[1], end_projected[0], end_projected[1]);
    }
    
    canvas_commit(canvas);
    delay(5000);
    gui_direct_draw_release(gui);
}

main();
