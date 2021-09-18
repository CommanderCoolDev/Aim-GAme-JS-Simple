"use strict";

const startBtn = document.querySelector('#start'),
timeList = document.querySelector('#time-list'),
timeEl = document.querySelector('#time'),
board = document.querySelector('#board'),
colors = ['#1fad37', '#07ff03','#db2e62', '#24c8ed', '#f2cb07', '#d10af0', '#d1f00a', '#8cf00a', '#6d0af0'],
screens = document.querySelectorAll('.screen');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (ev) => {
ev.preventDefault();
screens[0].classList.add('up');
});

timeList.addEventListener('click', ev => {
    if(ev.target.classList.contains('time-btn')) {
       time = parseInt(ev.target.getAttribute('data-time'));
       screens[1].classList.add('up');
       startGame();
    }
});

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
score++;
e.target.remove();
createRandomCircle();
    }
});

function startGame () {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
finishGame();
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }

}
function setTime(v) {
    timeEl.innerHTML = `00:${v}`;
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div'),
    color = getRandomColor(),
     size = getRandomNumber(10, 60),
     {width, height} = board.getBoundingClientRect(),
     x = getRandomNumber(0, width - size),
     y = getRandomNumber(0, height - size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    board.append(circle);

}

function getRandomNumber(min, max) {
return Math.round(Math.random() * (max - min) +min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
     }