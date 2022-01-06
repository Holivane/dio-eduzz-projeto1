let order = [];
let clickerOrder = [];
let score = 0;

/* 
0 - verde
1 - vermelho
2 - amarelo
3 - azul 
*/

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
            lose();
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
    })

    checkOrder();
}