// TODO: Modificar interfaz.
// TODO: Añadir selector intuitivo.
// TODO: Modularizar codigo.

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
let isdelete = {
    active: false,
};
let capas = [];

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

let valueIndicator = document.createElement('p');
valueIndicator.textContent = range.value;
valueContainer.appendChild(valueIndicator);

const addCanvas = () => {
    let newcanvas = document.createElement('canvas');
    newcanvas.width = 1300;
    newcanvas.height = 400;
    newcanvas.className = 'canvas2';
    newcanvas.id = 'canvas';
    main.appendChild(newcanvas);

    let capasContainer = document.createElement('div');
    capasContainer.className = 'capas-selector';
    selectorContainer.appendChild(capasContainer);

/*     ctx = newcanvas.getContext('2d');

    newcanvas.addEventListener('mousedown', (event) => {
        if (isdelete.active) {
            console.log('activo');
        }
        X = event.offsetX;
        Y = event.offsetY;
        draw(X, Y);
        newcanvas.addEventListener('mousemove', continuosDrawin)
    });
    newcanvas.addEventListener('mouseup', () => {
        newcanvas.removeEventListener('mousemove', continuosDrawin);
    }); */
    // Añade el componente que permite seleccionar las capas.
    
    const capasChild = document.createElement('div');
    capasChild.cssText = 'nueva capa';
    capasChild.className = 'capas-selector';
    capasChild.id = Math.floor(Math.random() * 100);
    capasContainer.id = capasChild.id;
    newcanvas.name = capasChild.id;

    capas.push({
      id: capasChild.id,
      component: capasChild,
      canvas: newcanvas,
    });

    canvas.addEventListener('mousedown', onMouseClick);
    canvas.addEventListener('mouseup', stopDrawin);

    capasContainer.addEventListener('click', () => {
        let counter = capas.length;
        capas.find(e => {
            if (e.id != newcanvas.name) {
                e.canvas.className = 'canvas2';
            } 

            if (e.id === newcanvas.name) {
                e.canvas.className = 'canvas3';
                if (newcanvas.className === 'canvas3') {
                    capasContainer.className = 'capa-is-selected';
                    ctx = e.canvas.getContext('2d');
                    e.canvas.addEventListener('mousedown', (event) => {
                        if (isdelete.active) {
                            console.log('activo');
                        }
                        X = event.offsetX;
                        Y = event.offsetY;
                        draw(X, Y);
                        e.canvas.addEventListener('mousemove', continuosDrawin)
                    });
                    e.canvas.addEventListener('mouseup', () => {
                        e.canvas.removeEventListener('mousemove', continuosDrawin);
                    });
                }
            }
        })
    })

}


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

const stopClearlineCanvas = () => {
    isdelete.active = false;
    sizeSelectionText.textContent = 'tamaño del pincel';
}

const clearLineCanvas = () => {
    isdelete.active = true;
    sizeSelectionText.textContent = 'tamaño de la goma';
}

const clearCanvas = (cursorX, cursorY) => {
    ctx.clearRect(cursorX, cursorY, rangeValue, rangeValue);
    X = cursorX;
    Y = cursorY;
}

const onMouseClick = (event) => {
    if (isdelete.active) {
        console.log('activo');
    }
    X = event.offsetX;
    Y = event.offsetY;
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


/* canvas.addEventListener('mousedown', onMouseClick);
canvas.addEventListener('mouseup', stopDrawin); */
range.addEventListener('mousedown', onChangeRange);
deleteButton.addEventListener('click', clearLineCanvas);
drawButton.addEventListener('click', stopClearlineCanvas);
addNewCanvas.addEventListener('click', addCanvas);
