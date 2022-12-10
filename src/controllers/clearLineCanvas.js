const sizeSelectionText = document.getElementById('size');

export const clearLineCanvas = (isdelete) => {
    isdelete.active = true;
    sizeSelectionText.textContent = 'tamaño de la goma';
}