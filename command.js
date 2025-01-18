// 🌙 前回のテーマを適用、なければデバイス設定を適用
const savedTheme = localStorage.getItem('thememode');
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(systemDarkMode ? "dark" : "light");
}

// 🎨 テーマの適用関数
function applyTheme(mode) {
    const setting = document.getElementById('setting');
    if (mode === "dark") {
        setting.classList.add("dark");
        localStorage.setItem('thememode', 'dark');
    } else {
        setting.classList.remove("dark");
        localStorage.setItem('thememode', 'light');
    }
}

// タイピングアニメーションの開始
startTyping("Please command: ");

// 💬 タイピング効果の関数
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
            textarea.focus();
        }
        updateLineNumbers();
    }, 12.5);

    // 📄 行番号を更新する関数
    function updateLineNumbers() {
        const lines = textarea.value.split('\n');
        lineNumbers.innerHTML = '';
        lines.forEach((_, i) => {
            lineNumbers.innerHTML += `
                ${i + 1}<button class="copy_button" title="Copy" onclick="letter_copy(${i + 1})"></button><br>
            `;
        });
        lineNumbers.innerHTML += '<br>';
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
        const inputText = textarea.value.split('\n').pop().replace("Please command: ", "").trim();
        if (inputText === "") return;

        if (inputText === "help" || inputText === "?") {
            const commands = Array.from(commandList.getElementsByTagName('li')).map(item => `- ${item.getAttribute('value')}: ${item.textContent}`).join('\n');
            textarea.value += `\n${commands}\nPlease command: `;
        } else if (inputText.startsWith("clear")) {
            const args = inputText.slice(5).trim();
            const lines = textarea.value.split('\n');
            if (args) {
                const lineNumber = parseInt(args, 10);
                if (!isNaN(lineNumber) && lineNumber > 0 && lineNumber <= lines.length) {
                    lines.splice(lineNumber - 1, 1);
                    textarea.value = lines.join('\n');
                    textarea.value += "\nPlease command: ";
                } else {
                    textarea.value += `\n> Invalid line number: ${args}\nPlease command: `;
                }
            } else {
                textarea.value = "Please command: ";
            }
            updateLineNumbers();
        } else if (inputText === "about") {
            textarea.value += "\n> This is a custom command editor.\nPlease command: ";
        } else if (inputText === "close") {
            window.close();
        } else if (inputText === "reload") {
            window.location.reload();
        } else if (inputText.startsWith("console ")) {
            const consoleCommand = inputText.slice(8);
            if (consoleCommand === "*clear*") {
                console.clear();
                textarea.value += `\n> Console has been cleared.\nPlease command: `;
            } else {
                console.log(consoleCommand);
                textarea.value += `\n> '${consoleCommand}' has been logged to the console.\nPlease command: `;
            }
        } else if (inputText.startsWith("echo ")) {
            const echoText = inputText.slice(5);
            textarea.value += `\n> ${echoText}\nPlease command: `;
        } else if (inputText.startsWith("mode ")) {
            const mode = inputText.slice(5);
            if (mode === "light" || mode === "dark") {
                applyTheme(mode);
                textarea.value += `\n> Switched to ${mode} mode.\nPlease command: `;
            } else {
                textarea.value += `\n> '${mode}' mode does not exist.\nPlease command: `;
            }
        } else if (inputText.startsWith("data ")) {
            const data_mode = inputText.slice(5);
            if (data_mode === "delete") {
                localStorage.removeItem('thememode');
                textarea.value += `\n> Data has been erased.\nPlease command: `;
            } else {
                textarea.value += `\n> '${data_mode}' does not exist.\nPlease command: `;
            }
        } else {
            textarea.value += `\n> '${inputText}' is an invalid command. Type 'help' to see the available commands.\nPlease command: `;
        }
        lockIndex = textarea.value.length;
    }
}

// 🖋️ クリップボードに行をコピーする関数
function letter_copy(lineNumber) {
    const textarea = document.getElementById("memo");
    const lines = textarea.value.split('\n');
    if (lineNumber > 0 && lineNumber <= lines.length) {
        const lineContent = lines[lineNumber - 1];
        copy_alert();
        textarea.focus();
        navigator.clipboard.writeText(lineContent).catch(() => {
            console.error("Failed to copy");
        });
        
    }
}

// グローバル変数でタイマーIDを管理
let copyTimeout;

function copy_alert() {
    const alert_element = document.getElementById("copy_notification");

    // 既存のタイマーがあればキャンセル
    if (copyTimeout) {
        clearTimeout(copyTimeout);
    }

    // 通知を表示
    alert_element.classList.add("display_alert");

    // 新たにタイマーをセット
    copyTimeout = setTimeout(() => {
        alert_element.classList.remove("display_alert");
    }, 2000); // 2秒後に非表示
}
