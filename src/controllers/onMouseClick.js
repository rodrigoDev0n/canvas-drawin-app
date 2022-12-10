// TODO: Pasar variable por parametros:
let isdelete = {
    active: false,
};

export const onMouseClick = (event) => {
    if (isdelete.active) {
        console.log('activo');
    }
    X = event.offsetX;
    Y = event.offsetY;
    draw(X, Y);
    canvas.addEventListener('mousemove', continuosDrawin)
}