import { onChangeRange } from "./controllers.js";

const paintColors = document.getElementById('colors');

export const createColorsContainer = (c) => {
    onChangeRange();

    let color = document.createElement('div');
    let text = document.createElement('p');
    text.textContent = c;
    color.className = 'colors-selection';
    color.id = c
    color.style.cssText = `background-color: ${c}`;
    color.appendChild(text);
    paintColors.appendChild(color);
    color.addEventListener('click', () => {
        changeColorPalette(color.id);
        selectedname.style.cssText = `background-color: ${color.id}`;
    })
}