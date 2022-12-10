// TODO: Modificar interfaz.
// TODO: Añadir selector intuitivo.

import { colors } from "./src/data/colors.js";
import { 
    addCanvas, 
    onChangeRange, 
    createColorsContainer,
    stopClearlineCanvas,
    clearLineCanvas,
    clearCanvas,
    onMouseClick,
} from "./src/controllers/controllers.js";

const canvas = document.getElementById('canvas');
const paintColors = document.getElementById('colors');
const selected = document.getElementsByName('colores');
const selectedColorName = document.getElementById('colortext');
const range = document.getElementById('range');
const valueContainer = document.getElementById('valueContainer');
const deleteButton = document.getElementById('delete');
const drawButton = document.getElementById('draw');
const sizeSelectionText = document.getElementById('size');
const addNewCanvas = document.getElementById('add');
const main = document.getElementById('main');
const opts = document.getElementById('options');
const selectorContainer = document.getElementById('selector'); 



let ctx = canvas.getContext('2d');

let X;
let Y;
let initColor = '#000';
let rangeValue = 5;

let capas = [];

let valueIndicator = document.createElement('p');
valueIndicator.textContent = range.value;
valueContainer.appendChild(valueIndicator);

const changeColorPalette = (color) => {
    initColor = color;
}

let selectedname = document.createElement('div');
selectedname.className = 'custom-color-container';
selectedname.style.cssText = `background-color: ${initColor}`;
selectedColorName.appendChild(selectedname);


colors.map(c => (
    createColorsContainer(c)
));

const draw = (cursorX, cursorY) => {
    if (isdelete.active) return;

    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineHeight = 10;
    ctx.lineWidth = rangeValue;
    ctx.strokeStyle = initColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const circle = new Path2D();
    circle.arc(cursorX, cursorY, 0, 100, 2 * Math.PI, initColor);

    ctx.lineTo(cursorX, cursorY);
    ctx.stroke(circle);

    X = cursorX;
    Y = cursorY;
}

const continuosDrawin = (event) => {
    if(isdelete.active) {
        clearCanvas(event.offsetX, event.offsetY);
    } else {
        draw(event.offsetX, event.offsetY);
    }
}

const stopDrawin = () => {
    canvas.removeEventListener('mousemove', continuosDrawin);
    canvas.removeEventListener('mousedown', draw);
}

range.addEventListener('mousedown', onChangeRange);
deleteButton.addEventListener('click', clearLineCanvas);
drawButton.addEventListener('click', stopClearlineCanvas);
addNewCanvas.addEventListener('click', addCanvas);
