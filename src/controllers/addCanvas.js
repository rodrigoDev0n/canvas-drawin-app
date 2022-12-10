import { onMouseClick } from "./onMouseClick";

export const addCanvas = () => {
    let newcanvas = document.createElement('canvas');
    newcanvas.width = 1300;
    newcanvas.height = 400;
    newcanvas.className = 'canvas2';
    newcanvas.id = 'canvas';
    main.appendChild(newcanvas);

    let capasContainer = document.createElement('div');
    capasContainer.className = 'capas-selector';
    selectorContainer.appendChild(capasContainer);
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