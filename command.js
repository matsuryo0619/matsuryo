// 🌙 前回のテーマを適用、なければデバイス設定を適用
const savedTheme = localStorage.getItem('theme');  // ローカルストレージから取得
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);  // 保存されたテーマを適用
} else {
    applyTheme(systemDarkMode ? "dark" : "light");  // デバイス設定を適用
}

// 🎨 テーマの適用関数
function applyTheme(mode) {
    const setting = document.getElementById('setting');
    if (mode === "dark") {
        setting.classList.add("dark");
        localStorage.setItem('theme', 'dark');  // ダークモードを保存
    } else {
        setting.classList.remove("dark");
        localStorage.setItem('theme', 'light');  // ライトモードを保存
    }
}

// 📝 自動入力開始
startTyping("Pleace command: ");

function startTyping(text) {
    const textarea = document.getElementById("memo");
    const lineNumbers = document.getElementById("line-numbers");
    const commandList = document.getElementById("command-list");
    let index = 0;
    let lockIndex = 0;

    const interval = setInterval(function () {
        textarea.value += text[index];
        index++;
        lockIndex = textarea.value.length;

        if (index >= text.length) {
            clearInterval(interval);
        }
        
        updateLineNumbers();
    }, 12.5);

    function updateLineNumbers() {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbers.innerHTML += i + '<br>';
        }
    }

    textarea.addEventListener('input', updateLineNumbers);
    textarea.addEventListener('scroll', function () {
        lineNumbers.scrollTop = textarea.scrollTop;
    });

    textarea.addEventListener('keydown', function (event) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (event.key === "Enter") {
            event.preventDefault();
            handleCommand();
            updateLineNumbers();
        }

        if ((event.key === 'Backspace' || event.key === 'Delete') && start < lockIndex) {
            event.preventDefault();
            textarea.setSelectionRange(lockIndex, lockIndex);
        }

        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            textarea.setSelectionRange(lockIndex, textarea.value.length);
        }
    });

    function handleCommand() {
        const inputText = textarea.value.split('\n').pop().replace("Pleace command: ", "").trim();
        if (inputText === "") return;

        if (inputText === "help" || inputText === "?") {
            const commands = Array.from(commandList.getElementsByTagName('li')).map(item => {
                return `- ${item.getAttribute('value')}: ${item.textContent}`;
            }).join('\n');
            textarea.value += `\n${commands}\nPleace command: `;
        } else if (inputText === "clear") {
            textarea.value = "Pleace command: ";
        } else if (inputText === "about") {
            textarea.value += "\n> this is a custom command editor\nPleace command: ";
        } else if (inputText === "close") {
            window.close();
        } else if (inputText === "reload") {
            window.location.reload();
        } else if (inputText.startsWith("console ")) {
            const console_letter = inputText.slice(8);
            if (console_letter === "*clear*") {
                console.clear();
                textarea.value += `\n> clear console.\nPleace command: `;
            } else {
                console.log(console_letter);
                textarea.value += `\n> Output '${console_letter}' to console.\nPleace command: `;
            }
        } else if (inputText.startsWith("echo ")) {
            const echoText = inputText.slice(5);
            textarea.value += `\n> ${echoText}\nPleace command: `;
        } else if (inputText.startsWith("mode ")) {
            const mode = inputText.slice(5);
            if (mode === "light" || mode === "dark") {
                applyTheme(mode);  // 🎨 applyThemeで変更＆保存
                textarea.value += `\n> changed to ${mode} mode.\nPleace command: `;
            } else {
                textarea.value += `\n> '${mode}' mode does not exist\nPleace command: `;
            }
        } else {
            textarea.value += `\n> '${inputText}' is an invalid command.\nPleace command: `;
        }

        lockIndex = textarea.value.length;
    }

    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
