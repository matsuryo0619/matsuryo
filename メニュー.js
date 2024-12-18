// ボタンを押したときにリストを表示・非表示
toggleListButton.addEventListener('click', () => {
    // `menuList` のクラスを切り替える
    const isVisible = menuList.classList.toggle('show');

    // ボタンの文字をリストの状態に応じて切り替え
    toggleListButton.textContent = isVisible ? '- 新規' : '+ 新規';
});
