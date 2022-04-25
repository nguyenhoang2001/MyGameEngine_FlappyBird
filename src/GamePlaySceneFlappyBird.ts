import { passingScore } from "./FlappyBirdGame";
import { ObjectGame } from "./ObjectGame";
import { Pipe } from "./Pipe";
import { Scene } from "./Scene";

export class GamePlaySceneFlappyBird extends Scene {
    bird!: {objectGame:ObjectGame};
    textScore!: {objectGame:ObjectGame};
    pipeDown!: {objectGame:Pipe[]};
    pipeUp!: {objectGame:Pipe[]};
    score!: number;
    isGameOver!:boolean;
    isFly!: boolean;
    gravity!:number;
    gap!:number;
    lastTimeGeneratePipe!:number;
    constructor() {
        super();
        this.bird = {objectGame: new ObjectGame('.sky','bird','div',220,180,60,45)};
        this.textScore = {objectGame: new ObjectGame('.gameContainer','counterScore','div',220,570,100,45)};
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 2;
        this.gap = 450;
        this.lastTimeGeneratePipe = 0;
        this.isFly = false;
    }

    generatePipe() {
        let randomHeight = Math.random() * 60;
        this.pipeDown.objectGame.push(new Pipe('.gameContainer','obstacle','div',500,randomHeight,60,300));
        this.pipeUp.objectGame.push(new Pipe('.gameContainer','topObstacle','div',500,randomHeight + this.gap,60,300));
        let lengthPipe = this.pipeDown.objectGame.length;
        if(lengthPipe > 0) {
            this.pipeDown.objectGame[lengthPipe - 1].configureObject();
            this.pipeUp.objectGame[lengthPipe - 1].configureObject();
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.changeScene = true;
        passingScore.score = this.score;
        this.bird.objectGame.object.remove();
        for(let i = 0; i < this.pipeDown.objectGame.length; i++) {
            this.pipeDown.objectGame[i].object.remove();
            this.pipeUp.objectGame[i].object.remove();
        }
        this.textScore.objectGame.object.remove();
        document.removeEventListener('click',() => {this.isFly = true;});
        console.log('Game over');
    }

    moveObstacle() {
        for(let i = 0; i < this.pipeDown.objectGame.length; i++) {
            this.pipeDown.objectGame[i].left -= 2;
            this.pipeUp.objectGame[i].left -= 2;
            if(this.pipeDown.objectGame[i].updateCheck == false) {
                if(this.pipeDown.objectGame[i].left + 60 <= this.bird.objectGame.left) {
                    this.score += 1;
                    console.log('Your score: '+this.score);
                    this.pipeDown.objectGame[i].updateCheck = true;
                    this.pipeUp.objectGame[i].updateCheck = true;
                }
            }
            if(this.pipeDown.objectGame[i].left > 200 && this.pipeDown.objectGame[i].left < 280 && this.bird.objectGame.left == 220
                && (this.bird.objectGame.bottom < this.pipeDown.objectGame[i].bottom + 153 || 
                     this.bird.objectGame.bottom > this.pipeDown.objectGame[i].bottom + this.gap - 200) 
                        || this.bird.objectGame.bottom == 0) {
                this.gameOver();
            }
        }
        if(this.pipeDown.objectGame.length > 0 && this.pipeDown.objectGame[0].left == -60) {
            this.pipeDown.objectGame[0].object.remove();
            this.pipeUp.objectGame[0].object.remove();
            this.pipeDown.objectGame.shift();
            this.pipeUp.objectGame.shift();
        }
    }

    fly() {
        if(this.bird.objectGame.bottom < 500)
            this.bird.objectGame.bottom += 50;
    }

    initInputEvent() {
        document.addEventListener('click', () => {this.isFly = true});
    }

    inputProcessing(): void {
        if(this.isFly == true) {
            this.fly();
            this.isFly = false;
        }
    }

    update(time: number, delta: number): void {
        if(this.isGameOver == false) {
            this.bird.objectGame.bottom -= this.gravity;
            this.moveObstacle();
            let deltaGeneratePipe = time - this.lastTimeGeneratePipe;
            if(deltaGeneratePipe >= 3000) {
                this.generatePipe();
                this.lastTimeGeneratePipe = time;
            }
        }
    }

    startScene(): void {
        this.score = 0;
        this.isGameOver = false;
        this.isFly = false;
        this.bird.objectGame.bottom = 180;
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.bird.objectGame.configureObject();
        this.textScore.objectGame.configureObject();
        this.textScore.objectGame.object.innerHTML = this.score.toString();
        this.lastTimeGeneratePipe = window.performance.now();
        this.initInputEvent();
        this.generatePipe();
    }

    render(): void {
        this.renderer.renderObject(this.bird);
        this.renderer.renderObject(this.textScore);
        this.textScore.objectGame.object.innerHTML = this.score.toString();
        if(this.pipeDown.objectGame.length > 0) {
            this.renderer.renderManyObjects(this.pipeDown);
            this.renderer.renderManyObjects(this.pipeUp);
        }
    }
}