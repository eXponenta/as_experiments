
const stack = new Array(100);

export default function floodFill(x, y, color, width, height, buff) {
  let x1 = 0;
  let spanAbove, spanBelow;
  let stackIndex = 0;

  const oldc32 = data[(x + y * width)];

  stack[stackIndex ++] = x;
  stack[stackIndex ++] = y;

  while(stackIndex > 0) {
    const cy = stack[--stackIndex];
    const cx = stack[--stackIndex];

    while(x1 >= 0 && buff[y * w + x1] === oldc32) { x1--; }

    x1++;
    spanAbove = spanBelow = false;

    while(x1 < w && screenBuffer[y * w + x1] === oldColor)
    {
      screenBuffer[y * w + x1] = newColor;
      if(!spanAbove && y > 0 && screenBuffer[(y - 1) * w + x1] == oldColor)
      {
        push(stack, x1, y - 1);
        spanAbove = 1;
      }
      else if(spanAbove && y > 0 && screenBuffer[(y - 1) * w + x1] != oldColor)
      {
        spanAbove = 0;
      }
      if(!spanBelow && y < h - 1 && screenBuffer[(y + 1) * w + x1] == oldColor)
      {
        push(stack, x1, y + 1);
        spanBelow = 1;
      }
      else if(spanBelow && y < h - 1 && screenBuffer[(y + 1) * w + x1] != oldColor)
      {
        spanBelow = 0;
      }
      x1++;
    }
  }
}
