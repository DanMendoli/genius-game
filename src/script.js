let order = [];
let clickedOrder = [];
let score = 0;

//0 - green
//1 - red
//2 - yellow
//3 - blue

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const gameButton = document.querySelector('.game-button');
let gameMessage = document.querySelector('.game-message');

//creates random order or colors
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//lights the next color
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checks if the clicked buttons are the same of generated order in game
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        if(score > 0) {
            nextLevel();
        }
    }
}

//user click
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//returns the color
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//next level function
let nextLevel = () => {
    setTimeout(() => {
      gameMessage.textContent = `Score: ${score}`;
      score++;
      shuffleOrder()  
    }, 500)
    
}

//game over function
let gameOver = () => {
    gameMessage.textContent = 'Game Over! Tente novamente.';
    score = 0;
    order = [];
    clickedOrder = [];
    gameButton.onclick = () => {
        startGame();
    }
}

//start game function
let startGame = () => {
    setTimeout(() => {
        score = 0;
        order = [];
        clickedOrder = [];
        nextLevel();
    }, 3000);
    
    gameMessage.textContent = 'Prepare-se para iniciar um novo jogo.'; 
}

//click events
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

gameButton.onclick = () => {
    startGame();
}