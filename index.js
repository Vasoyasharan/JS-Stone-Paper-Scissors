let userScore = 0;
let computerScore = 0;

function database(computer_pick, user_pick) {
    const rps_data = {
        rock: { rock: 0.5, paper: 0, scissors: 1 },
        paper: { rock: 1, paper: 0.5, scissors: 0 },
        scissors: { rock: 0, paper: 1, scissors: 0.5 }
    };
    return rps_data[user_pick][computer_pick];
}

function computer_choice() {
    const choices = ['rock', 'paper', 'scissors'];
    const choice = Math.floor(Math.random() * 3);
    return choices[choice];
}

function getIconClass(pick) {
    switch (pick) {
        case 'rock':
            return 'fas fa-hand-rock';
        case 'paper':
            return 'fas fa-hand-paper';
        case 'scissors':
            return 'fas fa-hand-scissors';
        default:
            return '';
    }
}

function playSound(effect) {
    const audio = new Audio(effect);
    audio.play().catch(error => {
        console.error(`Error playing sound: ${error}`);
    });
}

function updateScore(result) {
    if (result === 1) {
        userScore++;
        document.getElementById('user-score').textContent = userScore;
    } else if (result === 0) {
        computerScore++;
        document.getElementById('computer-score').textContent = computerScore;
    }
}

function displayResult(computer_pick, user_pick) {
    const answerElem = document.querySelector("#answer");
    const userElem = document.querySelector("#user");
    const computerElem = document.querySelector("#computer");

    userElem.className = getIconClass(user_pick) + ' fa-3x fade-in';
    computerElem.className = getIconClass(computer_pick) + ' fa-3x fade-in';

    const result = database(computer_pick, user_pick);

    if (result === 1) {
        answerElem.textContent = "You Won!";
        answerElem.classList.add('text-success');
        answerElem.classList.remove('text-danger', 'text-warning');
        playSound('win.wav');
    } else if (result === 0) {
        answerElem.textContent = "You Lost!";
        answerElem.classList.add('text-danger');
        answerElem.classList.remove('text-success', 'text-warning');
        playSound('lose.wav');
    } else {
        answerElem.textContent = "It's a Draw!";
        answerElem.classList.add('text-warning');
        answerElem.classList.remove('text-success', 'text-danger');
        playSound('draw.wav');
    }

    updateScore(result);
}

function playgame(element) {
    const user_pick = element.id;
    const computer_pick = computer_choice();

    displayResult(computer_pick, user_pick);
}

// Ensure playgame function is accessible
window.playgame = playgame;
