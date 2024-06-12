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

function answer(computer_pick, user_pick) {
    const answerElem = document.querySelector("#answer");
    const user_img = document.querySelector("#user");
    const computer_img = document.querySelector("#computer");

    user_img.src = `${user_pick}.jpg`;
    computer_img.src = `${computer_pick}.jpg`;

    const result = database(computer_pick, user_pick);

    if (result === 1) {
        answerElem.textContent = "You Won!";
        answerElem.classList.add('text-success');
        answerElem.classList.remove('text-danger', 'text-warning');
    } else if (result === 0) {
        answerElem.textContent = "You Lost!";
        answerElem.classList.add('text-danger');
        answerElem.classList.remove('text-success', 'text-warning');
    } else {
        answerElem.textContent = "It's a Draw!";
        answerElem.classList.add('text-warning');
        answerElem.classList.remove('text-success', 'text-danger');
    }
}

function playgame(element) {
    const user_pick = element.id;
    const computer_pick = computer_choice();

    console.log(`User pick: ${user_pick}`);
    console.log(`Computer pick: ${computer_pick}`);

    answer(computer_pick, user_pick);
}
