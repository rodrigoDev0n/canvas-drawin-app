const canvas = document.getElementById('canvas');
const paintColors = document.getElementById('colors');
const selected = document.getElementsByName('colores');
const selectedColorName = document.getElementById('colortext');


const ctx = canvas.getContext('2d');

let X;
let Y;
let initColor = '#000';

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

const changeColorPalette = (color) => {
    initColor = color;
}

let selectedname = document.createElement('div');
selectedname.className = 'custom-color-container';
selectedname.style.cssText = `background-color: ${initColor}`;
selectedColorName.appendChild(selectedname);

const createColorsContainer = (c) => {
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

const onMouseClick = (event) => {
    X = event.offsetX;
    Y = event.offsetY
    console.log({X, Y});
    draw(X,Y);
    canvas.addEventListener('mousemove', continuosDrawin)
}

const draw = (cursorX, cursorY) => {
    ctx.beginPath();
    ctx.moveTo(X,Y);
    ctx.lineHeight = 100;
    ctx.lineWith = 100;
    ctx.strokeStyle = initColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(cursorX, cursorY);
    ctx.stroke();

    X = cursorX;
    Y = cursorY;
}

const continuosDrawin = (event) => {
    draw(event.offsetX, event.offsetY);
}

const stopDrawin = () => {
    canvas.removeEventListener('mousemove', continuosDrawin);
}

canvas.addEventListener('mousedown', onMouseClick);
canvas.addEventListener('mouseup', stopDrawin);