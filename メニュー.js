// メニュー要素を取得
const menu = document.getElementById("menu");
const searchBox = document.getElementById("searchBox");
const toggleListButton = document.getElementById("toggleListButton");
const newProjectList = document.getElementById("NewProjectList");

// メニュー表示用のキー
const toggleKey = "/";

// メニューの表示・非表示を切り替える関数
function toggleMenu() {
    if (menu.classList.contains("show")) {
        closeMenu();
    } else {
        openMenu();
    }
}

// メニューを開く
function openMenu() {
    menu.classList.add("show");
}

// メニューを閉じる
function closeMenu() {
    menu.classList.remove("show");
    newProjectList.classList.remove("show"); // リストを非表示にする
    searchBox.value = ""; // テキストボックスをリセット
    toggleListButton.textContent = "+ 新規"; // ボタンの文字をリセット
}

// リストの表示・非表示を切り替える関数
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
