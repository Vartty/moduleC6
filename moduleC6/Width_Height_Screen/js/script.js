const btnNode = document.querySelector('.btn');

btnNode.addEventListener('click', () => {
    const screenAvailWidth = window.screen.availWidth;
    const screenAvailHeight = window.screen.availHeight;
    console.log('Ширина', screenAvailWidth);
    console.log('Длина', screenAvailHeight);
    alert('Ширина: ' + screenAvailWidth + '; Длинна: ' + screenAvailHeight);
});