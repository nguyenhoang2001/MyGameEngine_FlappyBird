import { change_to_next_scene } from "./index";

var click_action = false;

export class gameplay_scene {
    // bird configure
    private position_bird_left: number;
    private position_bird_bottom: number;
    private myBird: HTMLDivElement;
    private gravity: number;
    private sky: HTMLInputElement;
    // proccess input   
    //private click_action = false;
    // the background
    private gameDisplay: HTMLInputElement;
    // decision to end game play
    private updateScore: number[];
    private currentScore: number;
    private isGameOver: boolean;
    // obstacle
    private myObstacleLeft: number[];
    private myObstacleBottom: number;
    private myObstacle: HTMLDivElement[];
    private myTopObstacle: HTMLDivElement[];
    private gap: number;
    // call to build more obstacles
    private lastTimeCall_generateObstacleFunction: number;
    // counter the score
    private counter_score: HTMLDivElement;

    constructor() {
        this.isGameOver = false;
        this.myObstacle = [];
        this.myTopObstacle = [];
        this.myObstacleLeft = [];
        this.currentScore = 0;
        this.updateScore = [];
        this.position_bird_left = 220;
        this.position_bird_bottom = 180;
        this.gravity = 2;
        this.gap = 450;
        this.myObstacleBottom = 0;
        this.lastTimeCall_generateObstacleFunction = 0;
        this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
        this.sky = document.querySelector('.sky') as HTMLInputElement;
        this.myBird = document.createElement('div');
        this.counter_score = document.createElement('div');
    }

    private click_confirm() {
        //this.click_action = true;
        click_action = true;
    }

    private gameOver() {
        this.isGameOver = true;
        document.removeEventListener('click', this.click_confirm);
        console.log('Game over');
    }

    private generateObstacle()
    {
        let randomHeight = Math.random() * 60;
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        var obstacle = document.createElement('div');
        var topObstacle = document.createElement('div');

        if(this.isGameOver == false) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
            this.gameDisplay.appendChild(obstacle);
            this.gameDisplay.appendChild(topObstacle);
            this.myObstacle.push(obstacle);
            this.myTopObstacle.push(topObstacle);
            this.myObstacleLeft.push(obstacleLeft);
            this.myObstacleBottom = obstacleBottom;
            this.updateScore.push(0);
        }

        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + this.gap + 'px';

    }

    private moveObstacle() {
        if(this.isGameOver == false) {
            for(let i = 0; i < this.myObstacleLeft.length; i++)
            {
                this.myObstacleLeft[i] -= 2;
                this.myObstacle[i].style.left = this.myObstacleLeft[i] + 'px';
                this.myTopObstacle[i].style.left = this.myObstacleLeft[i] + 'px';
                if(this.updateScore[i] == 0)
                {
                    if( this.myObstacleLeft.length > 0 && (this.myObstacleLeft[i] + 60 <= this.position_bird_left) ) {
                        this.currentScore += 1;
                        console.log("your score:" + this.currentScore);
                        this.updateScore[i] = 1;
                    }
                }
            }
            if(this.myObstacleLeft.length > 0 && this.myObstacleLeft[0] === -60) {
                this.gameDisplay.removeChild(this.myObstacle[0]);
                this.gameDisplay.removeChild(this.myTopObstacle[0]);
                this.myObstacle.shift();
                this.myTopObstacle.shift();
                this.myObstacleLeft.shift();
                this.updateScore.shift();
            }
            if(this.myObstacleLeft. length > 0) {
                if(this.myObstacleLeft[0] > 200 && this.myObstacleLeft[0] < 280 && this.position_bird_left === 220 && 
                    (this.position_bird_bottom < this.myObstacleBottom + 153 || 
                        this.position_bird_bottom > this.myObstacleBottom + this.gap - 200) ||
                    this.position_bird_bottom === 0 ) {
                    this.gameOver();
                    
                }
            }
        }
    }

    private updateCounterScore()
    {
        this.counter_score.innerHTML = this.currentScore.toString();
    }

    get_currentScore()
    {
        return this.currentScore;
    }

    gameplay_scene_setup() {
        this.isGameOver = false;
        this.myObstacle = [];
        this.myTopObstacle = [];
        this.myObstacleLeft = [];
        this.currentScore = 0;
        this.updateScore = [];
        this.position_bird_left = 220;
        this.position_bird_bottom = 180;
        this.gravity = 2;
        this.gap = 450;
        this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
        this.sky = document.querySelector('.sky') as HTMLInputElement;
        // Bird configuring
        this.myBird = document.createElement('div');
        this.myBird.classList.add('bird');
        this.sky.appendChild(this.myBird);
        this.myBird.style.bottom = this.position_bird_bottom + 'px';
        this.myBird.style.left = this.position_bird_left + 'px';
        // obstacles
        this.generateObstacle();
        this.lastTimeCall_generateObstacleFunction = window.performance.now();
        // counter score configuring
        this.counter_score = document.createElement('div');
        this.counter_score.classList.add('counter_score');
        this.gameDisplay.appendChild(this.counter_score);
    }

    gameplay_scene_proccessInput() {
        if(this.isGameOver == false) {
            document.addEventListener('click', this.click_confirm);
            // if(this.click_action == true)
            // {   
            //     if(this.position_bird_bottom < 500) this.position_bird_bottom += 50;
            //     this.click_action = false;
            // }
            if(click_action == true)
            {   
                if(this.position_bird_bottom < 500) this.position_bird_bottom += 50;
                click_action = false;
            }
        }
    }

    gameplay_scence_update(time: number, delta: number) {
        if(this.isGameOver == false) {
            this.position_bird_bottom -= this.gravity;
            // for obstacles
            this.moveObstacle();
            var deltacallGenerateObstacle = time - this.lastTimeCall_generateObstacleFunction;
            if(deltacallGenerateObstacle >= 3000) {
                this.generateObstacle(); 
                this.lastTimeCall_generateObstacleFunction = time;
            }
        }
    }

    gameplay_scene_render() {
        if(this.isGameOver == false) {
            this.updateCounterScore();
            this.myBird.style.bottom = this.position_bird_bottom + 'px';
            this.myBird.style.left = this.position_bird_left + 'px';
        }
        else {
            this.myBird.remove();
            this.counter_score.remove();
            for(let i = 0; i < this.myObstacle.length; i++)
            {
                this.myObstacle[i].remove();
                this.myTopObstacle[i].remove();
            }
            
            change_to_next_scene(1, true);
        }
    }
}

// // bird configure
// let position_bird_left: number;
// let position_bird_bottom: number;
// var myBird: HTMLDivElement;
// let gravity = 2;
// var sky :HTMLInputElement;
// // proccess input
// let click_action = false;
// // the background
// var gameDisplay: HTMLInputElement;
// // decision to end game play
// var updateScore :number[];
// let currentScore: number;
// let isGameOver: boolean;
// // obstacle
// var myObstacleLeft: number[];
// var myObstacleBottom: number;
// var myObstacle: HTMLDivElement[];
// var myTopObstacle: HTMLDivElement[];
// let gap = 450;
// // call to build more obstacles
// var lastTimeCall_generateObstacleFunction: number;
// // counter the score
// var counter_score: HTMLDivElement;

// function gameOver() {
//     isGameOver = true;
//     document.removeEventListener('click', click_confirm);
//     console.log('Game over');
//     updateNewScore(currentScore);
// }

// function generateObstacle()
// {
//     let randomHeight = Math.random() * 60;
//     let obstacleLeft = 500;
//     let obstacleBottom = randomHeight;
//     var obstacle = document.createElement('div');
//     var topObstacle = document.createElement('div');

//     if(isGameOver == false) {
//         obstacle.classList.add('obstacle');
//         topObstacle.classList.add('topObstacle');
//         gameDisplay.appendChild(obstacle);
//         gameDisplay.appendChild(topObstacle);
//         myObstacle.push(obstacle);
//         myTopObstacle.push(topObstacle);
//         myObstacleLeft.push(obstacleLeft);
//         myObstacleBottom = obstacleBottom;
//         updateScore.push(0);
//     }

//     obstacle.style.left = obstacleLeft + 'px';
//     obstacle.style.bottom = obstacleBottom + 'px';
//     topObstacle.style.left = obstacleLeft + 'px';
//     topObstacle.style.bottom = obstacleBottom +gap + 'px';

// }

// function click_confirm() {
//     click_action = true;
// }

// function moveObstacle() {
//     if(isGameOver == false) {
//         for(let i = 0; i < myObstacleLeft.length; i++)
//         {
//             myObstacleLeft[i] -= 2;
//             myObstacle[i].style.left = myObstacleLeft[i] + 'px';
//             myTopObstacle[i].style.left = myObstacleLeft[i] + 'px';
//             if(updateScore[i] == 0)
//             {
//                 if( myObstacleLeft.length > 0 && (myObstacleLeft[i] + 60 <= position_bird_left) ) {
//                     currentScore += 1;
//                     console.log("your score:" + currentScore);
//                     updateScore[i] = 1;
//                 }
//             }
//         }
//         if(myObstacleLeft.length > 0 && myObstacleLeft[0] === -60) {
//             gameDisplay.removeChild(myObstacle[0]);
//             gameDisplay.removeChild(myTopObstacle[0]);
//             myObstacle.shift();
//             myTopObstacle.shift();
//             myObstacleLeft.shift();
//             updateScore.shift();
//         }
//         if(myObstacleLeft. length > 0) {
//             if(myObstacleLeft[0] > 200 && myObstacleLeft[0] < 280 && position_bird_left === 220 && 
//                 (position_bird_bottom < myObstacleBottom + 153 || 
//                     position_bird_bottom > myObstacleBottom + gap - 200) ||
//                 position_bird_bottom === 0 ) {
//                 gameOver();
                
//             }
//         }
//     }
// }

// function updateCounterScore()
// {
//     counter_score.innerHTML = currentScore.toString();
// }

// export function gameplay_scene_setup() {
//     isGameOver = false;
//     myObstacle = [];
//     myTopObstacle = [];
//     myObstacleLeft = [];
//     currentScore = 0;
//     updateScore = [];
//     position_bird_left = 220;
//     position_bird_bottom = 180;
//     gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
//     sky = document.querySelector('.sky') as HTMLInputElement;
//     // Bird configuring
//     myBird = document.createElement('div');
//     myBird.classList.add('bird');
//     sky.appendChild(myBird);
//     myBird.style.bottom = position_bird_bottom + 'px';
//     myBird.style.left = position_bird_left + 'px';
//     // obstacles
//     generateObstacle();
//     lastTimeCall_generateObstacleFunction = window.performance.now();
//     // counter score configuring
//     counter_score = document.createElement('div');
//     counter_score.classList.add('counter_score');
//     gameDisplay.appendChild(counter_score);
// }

// export function gameplay_scene_proccessInput() {
//     if(isGameOver == false) {
//         document.addEventListener('click', click_confirm);
//         if(click_action == true)
//         {   
//             if(position_bird_bottom < 500) position_bird_bottom += 50;
//             click_action = false;
//         }
//     }
// }

// export function gameplay_scence_update(time: number, delta: number) {
//      if(isGameOver == false) {
//         position_bird_bottom -= gravity;
//         // for obstacles
//         moveObstacle();
//         var deltacallGenerateObstacle = time - lastTimeCall_generateObstacleFunction;
//         if(deltacallGenerateObstacle >= 3000) {
//             generateObstacle(); 
//             lastTimeCall_generateObstacleFunction = time;
//         }
//     }
// }

// export function gameplay_scene_render() {
//     if(isGameOver == false) {
//         updateCounterScore();
//         myBird.style.bottom = position_bird_bottom + 'px';
//         myBird.style.left = position_bird_left + 'px';
//     }
//     else {
//         myBird.remove();
//         counter_score.remove();
//         for(let i = 0; i < myObstacle.length; i++)
//         {
//             myObstacle[i].remove();
//             myTopObstacle[i].remove();
//         }
        
//         change_to_next_scene(1, true);
//     }
// }