// メニューの要素を取得
const menu = document.getElementById('menu');
const searchBox = document.getElementById('searchBox');
const toggleListButton = document.getElementById('toggleListButton');
const menuList = document.getElementById('menuList');
let mouseX = 0;
let mouseY = 0;

// マウスの移動を監視して座標を取得
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// メニューを表示する関数
function showMenu() {
    menu.style.left = `${mouseX}px`;
    menu.style.top = `${mouseY}px`;
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
    // `/` または `?` を検出
    if (event.key === '/' || event.key === '?') {
        if (document.activeElement === searchBox) return; // テキストボックス内では無効化

        if (!menu.classList.contains('show')) {
            showMenu();
        } else {
            hideMenu();
        }
        event.preventDefault(); // デフォルト動作を無効化
    }
});

// メニュー外をクリックした場合に非表示にする
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
        hideMenu();
    }
});

// ボタンを押したときにリストを表示・非表示
toggleListButton.addEventListener('click', () => {
    menuList.classList.toggle('show');
});

// テキストボックス内でEnterキーを押すと検索を実行
searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchBox.value.trim();
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank'); // 新しいタブで検索結果を開く
        }
    }
});
