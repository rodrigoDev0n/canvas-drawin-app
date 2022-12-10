export const clearCanvas = (cursorX, cursorY) => {
    ctx.clearRect(cursorX, cursorY, rangeValue, rangeValue);
    X = cursorX;
    Y = cursorY;
}