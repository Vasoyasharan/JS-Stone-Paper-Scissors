let userScore = 0;
let computerScore = 0;

document.getElementById('settings-button').addEventListener('click', function () {
    document.getElementById('settings-modal').style.display = 'flex';
});

document.getElementById('info-button').addEventListener('click', function () {
    document.getElementById('info-modal').style.display = 'flex';
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});

document.getElementById('theme').addEventListener('change', function () {
    document.body.className = this.value;
    document.querySelector('.modal-content').className = 'modal-content ' + this.value;
});

document.getElementById('bg-music').addEventListener('change', function () {
    const bgMusicAudio = document.getElementById('bg-music-audio');
    if (this.checked) {
        bgMusicAudio.play();
    } else {
        bgMusicAudio.pause();
    }
});

document.getElementById('difficulty').addEventListener('change', function () {
    const difficultyLevel = document.getElementById('difficulty-level');
    difficultyLevel.textContent = 'Difficulty Level: ' + this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

document.getElementById('multiplayer').addEventListener('change', function () {
    const gameArea = document.getElementById('game-area');
    if (this.value === 'multi') {
        gameArea.innerHTML = `
            <div class="multiplayer">
                <div class="player">
                    <h2>Player 1</h2>
                    <div class="player-buttons">
                        <button class="btn" onclick="multiplayerChoice('rock', 1)"><i class="fas fa-hand-rock"></i> Rock</button>
                        <button class="btn" onclick="multiplayerChoice('paper', 1)"><i class="fas fa-hand-paper"></i> Paper</button>
                        <button class="btn" onclick="multiplayerChoice('scissors', 1)"><i class="fas fa-hand-scissors"></i> Scissors</button>
                    </div>
                    <div id="player1-choice" class="choice"></div>
                </div>
                <div class="result">
                    <div id="answer" class="result-text">Make Your Choice</div>
                </div>
                <div class="player">
                <div id="player2-choice" class="choice"></div>
                    <h2>Player 2</h2>
                    <div class="player-buttons">
                        <button class="btn" onclick="multiplayerChoice('rock', 2)"><i class="fas fa-hand-rock"></i> Rock</button>
                        <button class="btn" onclick="multiplayerChoice('paper', 2)"><i class="fas fa-hand-paper"></i> Paper</button>
                        <button class="btn" onclick="multiplayerChoice('scissors', 2)"><i class="fas fa-hand-scissors"></i> Scissors</button>
                    </div>
                </div>
            </div>`;
    } else {
        gameArea.innerHTML = `
            <div id="difficulty-level" class="difficulty-level">Difficulty Level: Easy</div>
            <div class="result">
                <div id="user" class="choice"></div>
                <div id="answer" class="result-text">Make Your Choice</div>
                <div id="computer" class="choice"></div>
            </div>
            <div class="player-buttons">
                <button class="btn" onclick="playGame('rock')"><i class="fas fa-hand-rock"></i> Rock</button>
                <button class="btn" onclick="playGame('paper')"><i class="fas fa-hand-paper"></i> Paper</button>
                <button class="btn" onclick="playGame('scissors')"><i class="fas fa-hand-scissors"></i> Scissors</button>
            </div>
            <div class="score-board">
                <div>Player Score: <span id="user-score">0</span></div>
                <div>Computer Score: <span id="computer-score">0</span></div>
            </div>`;
    }
});

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);
    updateScore(result);

    document.getElementById('user').className = getIconClass(userChoice) + ' fa-3x fade-in';
    document.getElementById('computer').className = getIconClass(computerChoice) + ' fa-3x fade-in';
    document.getElementById('answer').textContent = result;

    playSound(result);
}

function getComputerChoice() {
    const difficulty = document.getElementById('difficulty').value;
    const choices = ['rock', 'paper', 'scissors'];

    if (difficulty === 'easy') {
        return choices[Math.floor(Math.random() * choices.length)];
    } else if (difficulty === 'medium') {
        return choices[Math.floor(Math.random() * choices.length)];
    } else {
        // Hard mode - make it challenging
        return choices[Math.floor(Math.random() * choices.length)];
    }
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'Draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userScore++;
        return 'You Win';
    } else {
        computerScore++;
        return 'You Lose';
    }
}

function updateScore(result) {
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('computer-score').textContent = computerScore;
    if (userScore === 5 || userScore === 10 || userScore === 15 || userScore === 20) {
        displayFireworks();
    }
}

function getIconClass(choice) {
    switch (choice) {
        case 'rock':
            return 'fas fa-hand-rock';
        case 'paper':
            return 'fas fa-hand-paper';
        case 'scissors':
            return 'fas fa-hand-scissors';
    }
}

function playSound(result) {
    let sound;
    switch (result) {
        case 'You Win':
            sound = document.getElementById('win-sound');
            break;
        case 'You Lose':
            sound = document.getElementById('lose-sound');
            break;
        case 'Draw':
            sound = document.getElementById('draw-sound');
            break;
    }
    sound.play();
}

function multiplayerChoice(choice, player) {
    if (player === 1) {
        document.getElementById('player1-choice').className = getIconClass(choice) + ' fa-3x fade-in';
    } else {
        document.getElementById('player2-choice').className = getIconClass(choice) + ' fa-3x fade-in';
    }

    const player1Choice = document.getElementById('player1-choice').className.split(' ')[1];
    const player2Choice = document.getElementById('player2-choice').className.split(' ')[1];

    if (player1Choice && player2Choice) {
        const result = getResult(player1Choice.split('-')[2], player2Choice.split('-')[2]);
        document.getElementById('answer').textContent = result;

        // Reset choices after displaying result
        setTimeout(() => {
            document.getElementById('player1-choice').className = 'choice';
            document.getElementById('player2-choice').className = 'choice';
            document.getElementById('answer').textContent = 'Make Your Choice';
        }, 1000); // Adjust timing as needed
    }
}


function displayFireworks() {
    // Display fireworks for 3 seconds
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks';
    document.body.appendChild(fireworks);
    setTimeout(() => {
        document.body.removeChild(fireworks);
    }, 3000);
}
