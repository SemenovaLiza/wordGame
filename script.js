// ChatGPT Conversation Links:
// 1. https://chatgpt.com/share/67b27ee8-7ad0-800c-9951-9327b213abb7
// 2. https://chatgpt.com/share/67b280a2-2800-800c-9e1b-2a2aa7c6f62b
// 3. https://chatgpt.com/share/67b2829b-7270-800c-bf91-2f80a0b0711c
// 4. https://chatgpt.com/share/67b29c1a-d8b8-800c-9c45-4752170f49a0
// 5. https://chatgpt.com/share/67b29d9d-90e8-800c-9e34-abb61488f44b
// Add as many links as needed
// Elizaveta Semenova - 301457815
let words = ["PIZZA", "UNICORN", "ROBOT", "BANANA", "SPACESHIP", "NINJA"];

let currentWord = "";
let lives = 6;
let guessedLetters = 0;
let usedLetters = [];
let timerInterval;
let timeLeft = 10;

let gameContent = document.getElementById("game-content");
let timeContent = document.getElementById("timer");
let classicModeBtn = document.getElementById("classic-mode");
let timeModeBtn = document.getElementById("time-mode");
let wordContainer = document.getElementById("word-container");
let livesDisplay = document.getElementById("lives-count");
let messageDisplay = document.getElementById("message");
let keys = document.querySelectorAll(".key");
let timerDisplay = document.getElementById("time-left");


function gameOver() {
    messageDisplay.innerHTML = "💀 Game Over! The word was: " +
        currentWord;
    keys.forEach(key => key.disabled = true);
}

function resetGame() {
    clearInterval(timerInterval);
    timeContent.style.display = "none";
    keys.forEach(key => key.disabled = false);
    timeLeft = 10;
    usedLetters = [];
    lives = 6;
    guessedLetters = 0;

}

function disableKey(keyW) {
    for (let i = 0; i < keys.length; i++) {
        if (keyW == keys[i].textContent) {
            keys[i].disabled = true;

        }
    }
}

function startGame(mode) {
    clearInterval(timerInterval);
    resetGame();
    let randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    gameContent.style.display = "block";
    messageDisplay.textContent = "";
    livesDisplay.textContent = lives;
    updateWordDisplay();
    if (mode == "time-mode") {
        timeContent.style.display = "block";
    }
}

function updateWordDisplay() {
    wordContainer.innerHTML = "";

    for (let i = 0; i < currentWord.length; i++) {
        let span = document.createElement("span");
        span.textContent = "_";
        span.className = "word-underscore";
        wordContainer.appendChild(span);
    }
}


function timer() {
    timerDisplay.innerHTML = timeLeft;
    timerInterval = setInterval(function() {
        timeLeft -= 1;
        timerDisplay.innerHTML = timeLeft;
        if (timeLeft == 0) {
            gameOver();
            resetGame();
        }
    }, 1000);
}


function guessWord(keyW) {
    timer();
    if (lives == 0) {
        gameOver();
        return;
    }

    let indices = [];
    if (currentWord.includes(keyW)) {
        let index = currentWord.indexOf(keyW);
        while (index !== -1) {
            indices.push(index);
            guessedLetters += 1;
            index = currentWord.indexOf(keyW, index + 1);
        }
        indices.forEach(i => {
            wordContainer.children[i].textContent = keyW;
            usedLetters.push(keyW);
        });

        disableKey(keyW);
        if (guessedLetters == currentWord.length) {
            messageDisplay.innerHTML = "🎉 You Win!";
            clearInterval(timerInterval);
        }

    } else {
        if (usedLetters.includes(keyW) == false) {
            lives -= 1;
            livesDisplay.innerHTML = lives;
            usedLetters.push(keyW);
            disableKey(keyW);
        }
    }

}


classicModeBtn.addEventListener("click", () => {
    startGame("classic-mode");
});


timeModeBtn.addEventListener("click", () => {
    startGame("time-mode");
});


document.body.addEventListener("keydown", (e) => {
    e.preventDefault();
    let keyW = e.key.toUpperCase();
    guessWord(keyW);
});


keys.forEach(key => {
    key.addEventListener("click", function() {
        let keyW = this.textContent.toUpperCase();
        guessWord(keyW);
    });
});