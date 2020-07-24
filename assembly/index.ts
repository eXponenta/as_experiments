const N_DX: u32[] = [0, 1, 0, -1]; // relative neighbor x coordinates
const N_DY: u32[] = [-1, 0, 1, 0]; // relative neighbor y coordinates

export const Uint32Array_ID = idof<Uint32Array>();

const stack: Array<u32> = new Array<u32>(8);

export function floodFill(x: u32, y: u32, color: u32, width: u32, height: u32, data: Uint32Array): u32 
{
		const index: u32 = (x + y * width);
		const oldc32 = unchecked(data[index]);

		let stackIndex: u32 = 0;
    let count: u32 = 0;

		unchecked(stack[stackIndex ++] = x);
		unchecked(stack[stackIndex ++] = y);

		while(stackIndex > 0) {
			const cy: u32 = unchecked(stack[--stackIndex]);
      const cx: u32 = unchecked(stack[--stackIndex]);
      
			const i:u32 = (cx + cy * width);

			data[i] = color;
      count ++;

      let nx = cx + 0;
      let ny = cy - 1;
  
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
        const ni = (nx + ny * width);
        
        if (unchecked(data[ni]) === oldc32) {
          unchecked(stack[stackIndex++] = nx);
          unchecked(stack[stackIndex++] = ny);
        }
      }
  
      // j = 1
      nx = cx + 1;
      ny = cy + 0;
  
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
        const ni = nx + ny * width;
        
        if (unchecked(data[ni]) === oldc32) {
          unchecked(stack[stackIndex++] = nx);
          unchecked(stack[stackIndex++] = ny);
        }
      }
  
      // j = 2
      nx = cx + 0;
      ny = cy + 1;
  
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
        const ni = nx + ny * width;
        
        if (unchecked(data[ni]) === oldc32) {
          unchecked(stack[stackIndex++] = nx);
          unchecked(stack[stackIndex++] = ny);
        }
      }
  
      // j = 3
      nx = cx - 1;
      ny = cy + 0;
  
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
        const ni = nx + ny * width;
        
        if (unchecked(data[ni]) === oldc32) {
          unchecked(stack[stackIndex++] = nx);
          unchecked(stack[stackIndex++] = ny);
        }
      }
		}

    return count;

	}