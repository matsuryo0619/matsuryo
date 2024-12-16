const menu = document.getElementById('menu');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function showMenu() {
    menu.style.left = `${mouseX}px`;
    menu.style.top = `${mouseY}px`;
    menu.style.display = 'block';
    setTimeout(() => {
        menu.classList.add('show');
    }, 10);
}

function hideMenu() {
    menu.classList.remove('show');
    setTimeout(() => {
        menu.style.display = 'none';
    }, 300);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === '/') {
        if (!menu.classList.contains('show')) {
            showMenu();
        } else {
            hideMenu();
        }
    }
});
