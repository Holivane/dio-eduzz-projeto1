// Jogo da memória

// Variáveis referentes ao jogo
const data = {
    timeout: undefined,
    playerCanPlay: false,
    score: 0,
    gameSequence: [],
    clickerOrder: []
}


/* ordem:
0 - verde
1 - vermelho
2 - amarelo
3 - azul */

// Elementos HTML
const gui = {
    counter: document.querySelector('.gui-counter'),
    start: document.querySelector('.gui-btn--start'),
    pads: document.querySelectorAll('.game-pad')
}

// iniciar jogo
gui.start.addEventListener("click", () => {

    gui.counter.classList.toggle('gui-counter--on');
    gui.counter.innerHTML = "--";

    data.playerCanPlay = false
    data.score = 0;
    data.gameSequence = [];
    data.clickerOrder = [];

    disablePads();
    startGame();
});

// função que mostra a pontuação
const setScore = () => {
    const score = data.score.toString();
    const display = "00".substring(0, 2 - score.length) + score;
    gui.counter.innerHTML = display;
}

// sorteio de cores
const newColor = () => {
    data.gameSequence.push(Math.floor(Math.random() * 4));
    data.score++;

    setScore();
}

// função para mostrar as cores sorteadas
const playSequence = () => {
    let counter = 0,
        padOn = true;

    data.clickerOrder = [];
    data.playerCanPlay = false;

    const interval = setInterval(() => {
        if (padOn) {
            if (counter === data.gameSequence.length) {
                clearInterval(interval);
                disablePads();
                waitForPlayerClick();
                data.playerCanPlay = true;
                return;
            }

            const sndId = data.gameSequence[counter];
            const pad = gui.pads[sndId];

            pad.classList.add('game-pad--active');
            counter++;
        } else {
            disablePads();
        }

        padOn = !padOn;

    }, 750);
}


// função para o usuário jogar
const padListner = (e) =>{
    if(!data.playerCanPlay)
        return;

    let soundId;
    gui.pads.forEach((pad, key) => {
        if(pad === e.target)
            soundId = key;
    });

    e.target.classList.add("game-pad--active")

    data.sounds[soundId].play();
    data.clickerOrder.push(soundId);

    e.target.classList.remove("game-pad--active");
    
    const currentMove = data.clickerOrder.length -1;
}

// função para escutar o click
gui.pads.forEach(pad => {
    pad.addEventListener('click', padListner);
})

// função para o botão start
const startGame = () => {
    blink('--', () => {
        newColor();
        playSequence();
    })
}

const waitForPlayerClick = () => {
    clearTimeout(data.timeout);

    data.timeout = setTimeout(() => {
        if (!data.playerCanPlay)
            return;

        disablePads();
        playSequence();
    }, 5000);
}

// função para piscar o contado ao startar o jogo
const blink = (text, callback) => {
    let counter = 0,
        on = true;

    gui.counter.innerHTML = text;

    const interval = setInterval(() => {
        if (on) {
            gui.counter.classList.remove("gui-counter--on")
        } else {
            gui.counter.classList.add("gui-counter--on");
            if (++counter === 2) {
                clearInterval(interval);
                callback();
            }
        }

        on = !on;
    }, 250);
}

// desabilitar as cores que foram selecionadas
const disablePads = () => {
    gui.pads.forEach(pad => {
        pad.classList.remove("game-pad--active")
    })
}