// メニューの要素を取得
const menu = document.getElementById('menu');

// メニューを表示する関数
function showMenu() {
    menu.classList.add('show');
}

// メニューを隠す関数
function hideMenu() {
    menu.classList.remove('show');
}

// キーボードイベントを監視
document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') { // Mキーを検出
        if (!menu.classList.contains('show')) {
            showMenu();
        } else {
            hideMenu();
        }
    }
});
