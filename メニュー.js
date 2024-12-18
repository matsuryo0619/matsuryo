// メニュー要素を取得
const menu = document.getElementById("menu");
const searchBox = document.getElementById("searchBox");
const toggleListButton = document.getElementById("toggleListButton");
const newProjectList = document.getElementById("NewProjectList");

// メニューを開閉するキー
const toggleKey = "/";

// 現在のマウス位置
let mouseX = 0;
let mouseY = 0;

// マウスの位置を取得
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// メニューを表示
function openMenu() {
    menu.style.left = `${mouseX}px`; // マウスのX座標に設定
    menu.style.top = `${mouseY}px`; // マウスのY座標に設定
    menu.classList.add("show");
}

// メニューを閉じる
function closeMenu() {
    menu.classList.remove("show");
    newProjectList.classList.remove("show"); // リストを非表示にする
    searchBox.value = ""; // テキストボックスをリセット
    toggleListButton.textContent = "+ 新規"; // ボタンの文字をリセット
}

// メニューの表示・非表示を切り替える関数
function toggleMenu() {
    if (menu.classList.contains("show")) {
        closeMenu();
    } else {
        openMenu();
    }
}

// リストの表示・非表示を切り替える
toggleListButton.addEventListener("click", () => {
    if (newProjectList.classList.contains("show")) {
        newProjectList.classList.remove("show");
        toggleListButton.textContent = "+ 新規";
    } else {
        newProjectList.classList.add("show");
        toggleListButton.textContent = "- 新規";
    }
});

// 外をクリックしたときにメニューを閉じる
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && event.target.id !== "menuToggleKey") {
        closeMenu();
    }
});

// 特定のキーでメニューをトグル
document.addEventListener("keydown", (event) => {
    if (event.key === toggleKey) {
        toggleMenu();
        event.preventDefault();
    }
});
