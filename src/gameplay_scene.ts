// import { inputHandler, renderer } from "./gameEngine";
// import { change_to_next_scene } from "./index";

// var click_action = false;
// let gameEngineRenderer = new renderer();
// let gameEngineInputHandler = new inputHandler();

// export class gameplay_scene {
//     // bird configure
//     private position_bird_left: number;
//     private position_bird_bottom: number;
//     private gravity: number;
//     // the background
//     private gameDisplay: HTMLInputElement;
//     // decision to end game play
//     private updateScore: number[];
//     private currentScore: number;
//     private isGameOver: boolean;
//     // obstacle
//     private myObstacleLeft: number[];
//     private myObstacleBottom: number[];
//     private gap: number;
//     // call to build more obstacles
//     private lastTimeCall_generateObstacleFunction: number;

//     private objectInScene: {object: HTMLElement[]};
//     private tubeObstacle: {object: HTMLElement[]};
//     private tubeUpObstacle: {object: HTMLElement[]};
//     private tubeWidth: number[];
//     private tubeHeight: number[];
//     private tubeUpBottom: number[];
//     constructor() {
//         this.isGameOver = false;
//         this.myObstacleLeft = [];
//         this.currentScore = 0;
//         this.updateScore = [];
//         this.position_bird_left = 220;
//         this.position_bird_bottom = 180;
//         this.gravity = 2;
//         this.gap = 450;
//         this.myObstacleBottom = [];
//         this.lastTimeCall_generateObstacleFunction = 0;
//         this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
//         this.objectInScene = {object: []};
//         this.tubeObstacle = {object:[]};
//         this.tubeUpObstacle = {object: []};
//         this.tubeWidth = [];
//         this.tubeHeight = [];
//         this.tubeUpBottom = [];
//     }

//     private click_confirm() {
//         click_action = true;
//     }

//     private gameOver() {
//         this.isGameOver = true;
//         gameEngineInputHandler.removeEventButton('click',this.click_confirm);
//         console.log('Game over');
//     }

//     private generateObstacle()
//     {
//         let randomHeight = Math.random() * 60;
//         let obstacleLeft = 500;
//         let obstacleBottom = randomHeight;

//         if(this.isGameOver == false) {
//             gameEngineRenderer.createObject(this.tubeObstacle,'.game-container','div','obstacle');
//             gameEngineRenderer.createObject(this.tubeUpObstacle,'.game-container','div','topObstacle');
//             this.myObstacleLeft.push(obstacleLeft);
//             this.myObstacleBottom.push(obstacleBottom);
//             this.tubeWidth.push(60);
//             this.tubeHeight.push(300);
//             this.updateScore.push(0);
//             this.tubeUpBottom.push(obstacleBottom + this.gap);
//         }
//         gameEngineRenderer.render(this.tubeObstacle, this.tubeWidth,this.tubeHeight, this.myObstacleLeft, this.myObstacleBottom);
//         gameEngineRenderer.render(this.tubeUpObstacle, this.tubeWidth,this.tubeHeight, this.myObstacleLeft, this.tubeUpBottom);

//     }

//     private moveObstacle() {
//         if(this.isGameOver == false) {
//             for(let i = 0; i < this.myObstacleLeft.length; i++)
//             {
//                 this.myObstacleLeft[i] -= 2;
//                 if(this.updateScore[i] == 0)
//                 {
//                     if( this.myObstacleLeft.length > 0 && (this.myObstacleLeft[i] + 60 <= this.position_bird_left) ) {
//                         this.currentScore += 1;
//                         console.log("your score:" + this.currentScore);
//                         this.updateScore[i] = 1;
//                     }
//                 }
//             }

//             if(this.myObstacleLeft.length > 0 && this.myObstacleLeft[0] === -60) {
//                 this.tubeObstacle.object[0].remove();
//                 this.tubeUpObstacle.object[0].remove();
//                 this.tubeObstacle.object.shift();
//                 this.tubeUpObstacle.object.shift();

//                 this.myObstacleLeft.shift();
//                 this.tubeHeight.shift();
//                 this.tubeWidth.shift();
//                 this.tubeUpBottom.shift();
//                 this.myObstacleBottom.shift();

//                 this.updateScore.shift();
//             }
//             if(this.myObstacleLeft. length > 0) {
//                 if(this.myObstacleLeft[0] > 200 && this.myObstacleLeft[0] < 280 && this.position_bird_left === 220 && 
//                     (this.position_bird_bottom < this.myObstacleBottom[0] + 153 || 
//                         this.position_bird_bottom > this.myObstacleBottom[0] + this.gap - 200) ||
//                     this.position_bird_bottom === 0 ) {
//                     this.gameOver();
                    
//                 }
//             }
//         }
//     }

//     private updateCounterScore()
//     {
//         this.objectInScene.object[1].innerHTML = this.currentScore.toString();
//     }

//     get_currentScore()
//     {
//         return this.currentScore;
//     }

//     gameplay_scene_setup() {
//         this.isGameOver = false;
//         this.tubeObstacle.object = [];
//         this.tubeUpObstacle.object = [];
//         this.tubeWidth = [];
//         this.tubeHeight = [];
//         this.tubeUpBottom = [];
//         this.myObstacleLeft = [];
//         this.myObstacleBottom = [];
//         this.currentScore = 0;
//         this.updateScore = [];
//         this.position_bird_left = 220;
//         this.position_bird_bottom = 180;
//         this.gravity = 2;
//         this.gap = 450;
//         this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
//         this.objectInScene.object = [];
//         // obstacles
//         this.generateObstacle();
//         this.lastTimeCall_generateObstacleFunction = window.performance.now();
//         gameEngineRenderer.createObject(this.objectInScene,'.sky', 'div','bird');
//         gameEngineRenderer.createObject(this.objectInScene,'.game-container', 'div','counter_score');
//         gameEngineRenderer.render(this.objectInScene,[60,100],[45,45],[this.position_bird_left,220],[this.position_bird_bottom,570]);
//     }

//     gameplay_scene_proccessInput() {
//         if(this.isGameOver == false) {
//             gameEngineInputHandler.enableEventButton('click',this.click_confirm);
//             if(click_action == true)
//             {   
//                 if(this.position_bird_bottom < 500) this.position_bird_bottom += 50;
//                 click_action = false;
//             }
//         }
//     }

//     gameplay_scence_update(time: number, delta: number) {
//         if(this.isGameOver == false) {
//             this.position_bird_bottom -= this.gravity;
//             // for obstacles
//             this.moveObstacle();
//             var deltacallGenerateObstacle = time - this.lastTimeCall_generateObstacleFunction;
//             if(deltacallGenerateObstacle >= 3000) {
//                 this.generateObstacle(); 
//                 this.lastTimeCall_generateObstacleFunction = time;
//             }
//         }
//     }

//     gameplay_scene_render() {
//         if(this.isGameOver == false) {
//             this.updateCounterScore();
//             gameEngineRenderer.render(this.objectInScene,[60],[45],[this.position_bird_left],[this.position_bird_bottom])
//             gameEngineRenderer.render(this.tubeObstacle, this.tubeWidth,this.tubeHeight, this.myObstacleLeft, this.myObstacleBottom);
//             gameEngineRenderer.render(this.tubeUpObstacle, this.tubeWidth,this.tubeHeight, this.myObstacleLeft, this.tubeUpBottom);
//         }
//         else {
//             gameEngineRenderer.removeObject(this.objectInScene);
//             gameEngineRenderer.removeObject(this.tubeObstacle);
//             gameEngineRenderer.removeObject(this.tubeUpObstacle);
//             change_to_next_scene(1, true);
//         }
//     }
// }
