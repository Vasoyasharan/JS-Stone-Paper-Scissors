let userScore = 0;
let computerScore = 0;
let difficultyLevel = 'medium'; // Default difficulty level

document.getElementById('settings-button').addEventListener('click', function() {
    document.getElementById('settings-modal').style.display = 'flex';
});

document.getElementById('info-button').addEventListener('click', function() {
    document.getElementById('info-modal').style.display = 'flex';
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

document.getElementById('theme').addEventListener('change', function() {
    document.body.className = this.value;
});

document.getElementById('bg-music-toggle').addEventListener('change', function() {
    const bgMusicAudio = document.getElementById('bg-music-audio');
    if (this.checked) {
        bgMusicAudio.play(); // Start playing background music when checked
    } else {
        bgMusicAudio.pause();
    }
});


// Trigger background music to start by default
const bgMusicAudio = document.getElementById('bg-music-audio');
bgMusicAudio.play();

document.getElementById('difficulty').addEventListener('change', function() {
    difficultyLevel = this.value;
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
    const choices = ['rock', 'paper', 'scissors'];
    let randomIndex;

    // Adjust difficulty level
    switch (difficultyLevel) {
        case 'easy':
            randomIndex = Math.floor(Math.random() * choices.length);
            break;
        case 'medium':
            randomIndex = Math.floor(Math.random() * choices.length);
            break;
        case 'hard':
            // Computer makes a more strategic choice
            randomIndex = Math.floor(Math.random() * 3); // Always selects the same choice (e.g., rock)
            break;
        default:
            randomIndex = Math.floor(Math.random() * choices.length);
    }

    return choices[randomIndex];
}
document.getElementById('difficulty').addEventListener('change', function() {
    difficultyLevel = this.value;
    document.getElementById('selected-difficulty').textContent = capitalizeFirstLetter(difficultyLevel);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
