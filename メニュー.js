// メニューの要素を取得
const menu = document.getElementById('menu');
let mouseX = 0; // マウスカーソルのX座標
let mouseY = 0; // マウスカーソルのY座標

// マウスの移動を監視し、座標を取得
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX; // ビューポート内のX座標
    mouseY = event.clientY; // ビューポート内のY座標
});

// メニューを表示する関数
function showMenu() {
    menu.style.left = `${mouseX}px`; // マウスのX座標に配置
    menu.style.top = `${mouseY}px`; // マウスのY座標に配置
    menu.style.display = 'block';
}

// メニューを非表示にする関数
function hideMenu() {
    menu.style.display = 'none';
}

// キーボードイベントを監視
document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === '/') { // /キーを検出
        if (menu.style.display === 'none') {
            showMenu();
        } else {
            hideMenu();
        }
    }
});
