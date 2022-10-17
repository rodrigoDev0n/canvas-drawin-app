const canvas = document.getElementById('canvas');
const paintColors = document.getElementById('colors');
const selected = document.getElementsByName('colores');
const selectedColorName = document.getElementById('colortext');
const range = document.getElementById('range');
const valueContainer = document.getElementById('valueContainer');
const deleteButton = document.getElementById('customButton');

const ctx = canvas.getContext('2d');

let X;
let Y;
let initColor = '#000';
let rangeValue = 5;
let isdelete = {
    active: false,
}

const colors = [
    '#A0D5D5',
    '#86CD7E',
    '#6ADAC5',
    '#E5E772',
    '#686CEC',
    '#E44B38',
    '#E4E238',
    '#E438E2',
    '#E9B536',
    '#10AA10',
    '#18DCC1',
    '#0F398D',
];

console.log(range);

let valueIndicator = document.createElement('p');
valueIndicator.textContent = range.value;
valueContainer.appendChild(valueIndicator);

const onChangeRange = () => {
    range.addEventListener('mousemove', () => valueIndicator.textContent = range.value)
    range.addEventListener('change', () => {
        if (range.value === 5) {
            ctx.lineWidth = 5;
        }
        rangeValue = range.value;
    });
}

const changeColorPalette = (color) => {
    initColor = color;
}

let selectedname = document.createElement('div');
selectedname.className = 'custom-color-container';
selectedname.style.cssText = `background-color: ${initColor}`;
selectedColorName.appendChild(selectedname);

const createColorsContainer = (c) => {
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

colors.map(c => (
    createColorsContainer(c)
));

const clearLineCanvas = () => {
    isdelete.active = true;
    console.log(isdelete.active);
}

const clearCanvas = (cursorX, cursorY) => {
    ctx.clearRect(cursorX, cursorY, 50, 50);
    X = cursorX;
    Y = cursorY;
}

const onMouseClick = (event) => {
    if (isdelete.active) {
        console.log('activo');
    }
    X = event.offsetX;
    Y = event.offsetY
    draw(X, Y);
    canvas.addEventListener('mousemove', continuosDrawin)
}

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

canvas.addEventListener('mousedown', onMouseClick);
canvas.addEventListener('mouseup', stopDrawin);
range.addEventListener('mousedown', onChangeRange);
deleteButton.addEventListener('click', clearLineCanvas);