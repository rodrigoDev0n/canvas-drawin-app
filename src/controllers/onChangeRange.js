
let valueIndicator = document.createElement('p');

export const onChangeRange = () => {
    range.addEventListener('mousemove', () => valueIndicator.textContent = range.value)
    range.addEventListener('change', () => {
        if (range.value === 5) {
            ctx.lineWidth = 5;
        }
        rangeValue = range.value;
    });
}