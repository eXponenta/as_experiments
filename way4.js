
const N_DX = [0, 1, 0, -1]; // relative neighbor x coordinates
const N_DY = [-1, 0, 1, 0]; // relative neighbor y coordinates

const stack = new Array(100);
export default function floodFill(x, y, color, width, height, data) 
{
    const index = (x + y * width);
    const oldc32 = data[index];

    let stackIndex = 0;
    let count = 0;

    stack[stackIndex ++] = x;
    stack[stackIndex ++] = y;

    while(stackIndex > 0) {
        const cy = stack[--stackIndex];
        const cx = stack[--stackIndex];

        if(stackIndex < 0) {
            break;
        }

        const i = (cx + cy * width);

        data[i] = color;

        for(let j = 0; j < 4; j ++) {
            let nx = cx + N_DX[j];
            let ny = cy + N_DY[j];

            if(nx >= 0 && ny >= 0 && nx < width && ny < height) {
                const ni = (nx + ny * width);
                
                if(data[ni] === oldc32) {
                    stack[stackIndex ++] = nx;
                    stack[stackIndex ++] = ny;
                }
            }
        }
    }

    return data;

}