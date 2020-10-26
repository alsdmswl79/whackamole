const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function startGame() {
    scoreBoard.textContent=0;
    score=0;
    timeUp=false;
    peep();

    setTimeout(()=> timeUp=true,10000);
    //10초 이후 게임이 끝나게 설정함.
}

function peep() {
    const time=randTime(1000,2000); //1초~2초 사이
    const hole=randHole(holes);
    hole.classList.add('up');

    setTimeout(()=>{//두더지를 넣어야 함.
        hole.classList.remove('up')
        if(!timeUp){
            peep();//게임이 끝나지 않았을 동안에는 peep계속 진행
        }
    },time);
}

function randTime(min, max) {
    return Math.round(Math.random() *(max-min)+min);
}

function randHole(holes) {
    const randIndex= Math.floor(Math.random()* holes.length);
    const hole= holes[randIndex];
    if(hole===lastHole){
        return randHole(holes);
    }
    lastHole=hole;
    return hole;
}

function bonk(e) {
    if (!e.isTrusted) return;

    this.classList.remove('up');
    score++;
    scoreBoard.textContent=score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));