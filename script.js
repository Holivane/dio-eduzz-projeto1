// Jogo da memória

// Variáveis referentes ao jogo
let order = [];
let clickerOrder = [];
let score = 0;
let iniciar = false;

/* ordem:
0 - verde
1 - vermelho
2 - amarelo
3 - azul */

// Elementos HTML
const gui = {
    counter: document.querySelector('.gui-counter'),
    start: document.querySelector('.gui-btn--start')
}

// iniciar jogo
gui.start.addEventListener("click", () => { })


// seleção de cores
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// função para sortear números entre 0 e 3
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickerOrder = [];

    for (let i in order) {
        let elementColor = creatColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1)
    }
}

// função para acender as cores
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected')
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected')
    });
}

// comparação da ordem gerada e clicada
let checkOrder = () => {
    for (let i in clickerOrder) {
        if (clickerOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if (clickerOrder.length == order.length) {
        alert(`Pontuação: ${score} \n Parabéns! Você acertou.\n Iniciando próximo nível!`);
        nextLevel();
    }
}

// função de clique do usuário
let click = (color) => {
    clickerOrder[clickerOrder.length] = color;
    creatColorElement(color).classList.add('selected');

    setTimeout(() => {
        creatColorElement(color).classList.remove('selected');
        checkOrder();
    }, 2500)
}

// função que retorna a cor
let creatColorElement = (color) => {
    if (color == 0) {
        return green
    } else if (color == 1) {
        return red
    } else if (color == 2) {
        return yellow
    } else if (color == 3) {
        return blue
    }
}

// função para próximo nível
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// função para fim de jogo
let gameOver = () => {
    alert(`Pontuação: ${score} \n Que pena! Você perdeu. \n Clique em OK para iniciar novo jogo.`);
    order = [];
    clickerOrder = [];

    playGame();
}

// função para iniciar jogo
let playGame = () => {
    //alert('Como está sua memória? Vamos começar!')
    score = 0;

    nextLevel();
}

// eventos de cliques
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//início do jogo
//playGame();