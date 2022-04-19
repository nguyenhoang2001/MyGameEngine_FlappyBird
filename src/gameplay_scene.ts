// bird configure
let position_bird_left = 220;
let position_bird_bottom = 180;
var myBird: HTMLDivElement;
let gravity = 2;
// proccess input
let click_action = false;
// the background
var gameDisplay: HTMLInputElement;
// decision to end game play
var updateScore :number[]= [];
let currentScore = 0;
let isGameOver = false;
// obstacle
var myObstacleLeft: number[] = [];
var myObstacleBottom: number;
var myObstacle: HTMLDivElement[] = [];
var myTopObstacle: HTMLDivElement[] = [];
let gap = 450;
// call to build more obstacles
var lastTimeCall_generateObstacleFunction: number;

function gameOver() {
    isGameOver = true;
    document.removeEventListener('click', click_confirm);
    console.log('Game over');
}

function generateObstacle()
{
    let randomHeight = Math.random() * 60;
    let obstacleLeft = 500;
    let obstacleBottom = randomHeight;
    var obstacle = document.createElement('div');
    var topObstacle = document.createElement('div');

    if(isGameOver == false) {
        obstacle.classList.add('obstacle');
        topObstacle.classList.add('topObstacle');
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        myObstacle.push(obstacle);
        myTopObstacle.push(topObstacle);
        myObstacleLeft.push(obstacleLeft);
        myObstacleBottom = obstacleBottom;
        updateScore.push(0);
    }

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.bottom = obstacleBottom +gap + 'px';

}

function click_confirm() {
    click_action = true;
}

function moveObstacle() {
    if(isGameOver == false) {
        for(let i = 0; i < myObstacleLeft.length; i++)
        {
            myObstacleLeft[i] -= 2;
            myObstacle[i].style.left = myObstacleLeft[i] + 'px';
            myTopObstacle[i].style.left = myObstacleLeft[i] + 'px';
            if(updateScore[i] == 0)
            {
                if( myObstacleLeft.length > 0 && (myObstacleLeft[i] + 60 <= position_bird_left) ) {
                    currentScore += 1;
                    console.log("your score:" + currentScore);
                    updateScore[i] = 1;
                }
            }
        }
        if(myObstacleLeft.length > 0 && myObstacleLeft[0] === -60) {
            gameDisplay.removeChild(myObstacle[0]);
            gameDisplay.removeChild(myTopObstacle[0]);
            myObstacle.shift();
            myTopObstacle.shift();
            myObstacleLeft.shift();
            updateScore.shift();
        }
        if(myObstacleLeft. length > 0) {
            if(myObstacleLeft[0] > 200 && myObstacleLeft[0] < 280 && position_bird_left === 220 && 
                (position_bird_bottom < myObstacleBottom + 153 || 
                    position_bird_bottom > myObstacleBottom + gap - 200) ||
                position_bird_bottom === 0 ) {
                gameOver();
                
            }
        }
    }
}

export function gameplay_scene_setup() {
    let sky = document.querySelector('.sky') as HTMLInputElement;
    gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
    let bird = document.createElement('div');
    bird.classList.add('bird');
    sky.appendChild(bird);
    console.log('came to this');
    myBird = bird;
    myBird.style.bottom = position_bird_bottom + 'px';
    myBird.style.left = position_bird_left + 'px';
    // obstacles
    generateObstacle();
    lastTimeCall_generateObstacleFunction = window.performance.now();
}

export function gameplay_scene_proccessInput() {
    if(isGameOver == false) {
        document.addEventListener('click', click_confirm);
        if(click_action == true)
        {   
            if(position_bird_bottom < 500) position_bird_bottom += 50;
            //console.log(position_bird_bottom);
            click_action = false;
        }
    }
}

export function gameplay_scence_update(time: number, delta: number) {
     if(isGameOver == false) {
        position_bird_bottom -= gravity;
        // for obstacles
        moveObstacle();
        var deltacallGenerateObstacle = time - lastTimeCall_generateObstacleFunction;
        if(deltacallGenerateObstacle >= 3000) {
            generateObstacle(); 
            lastTimeCall_generateObstacleFunction = time;
        }
    }
}

export function gameplay_scene_render() {
    if(isGameOver == false) {
        myBird.style.bottom = position_bird_bottom + 'px';
        myBird.style.left = position_bird_left + 'px';
    }
}