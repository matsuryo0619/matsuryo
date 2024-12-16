// メニューの要素を取得
const menu = document.getElementById('menu');
let mouseX = 0;
let mouseY = 0;

// マウスの移動を監視して座標を取得
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// メニューを表示する関数
function showMenu() {
    menu.style.left = `${mouseX + 115}px`;
    menu.style.top = `${mouseY + 25}px`;
    menu.style.display = 'block';
    setTimeout(() => {
        menu.classList.add('show');
    }, 10);
}

// メニューを非表示にする関数
function hideMenu() {
    menu.classList.remove('show');
    setTimeout(() => {
        menu.style.display = 'none';
    }, 300);
}

// キーボードイベントを監視
document.addEventListener('keydown', (event) => {
    if (event.key === '/' || event.key === '/') {
        if (!menu.classList.contains('show')) {
            showMenu();
        } else {
            hideMenu();
        }
    }
});

// メニュー外をクリックした場合に非表示にする
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) { // クリックした場所がメニュー外なら
        hideMenu();
    }
});
