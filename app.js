const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list')
let time = 0;
const timeEl = document.querySelector('#time');
const board  =  document.querySelector('.board');
let score = 0;


startBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    screens[0].classList.add('up');
})
timeList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    };
});

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime() {
    if(time === 0){
        finishGame();
    }else{
    let current = --time;
    if(current<10){
        current = `0${current}`;
    }
    setTime(current);
};
};
function setTime (value) {
    timeEl.innerHTML = `00:${value}`;
};

function finishGame() {
    timeEl.parentElement.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
    const restart  = document.createElement('div');
    restart.innerHTML = "<a href='index.html'>Начни сначала</a>";
    restart.style.fontSize = '30px';
   
    board.append(restart)
    board.style.display = 'block';
    board.style.paddingTop = '100px';
    restart.addEventListener('click', ()=>{
        for (let i=0; i < (screens.length)-1;i++){
            screens[i].classList.remove('up')
        }
    })
};

function createRandomCircle() {
    const circle  = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();

    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random()*(max-min)+min);
};


