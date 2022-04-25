import { passingScore } from "./FlappyBirdGame";
import { ObjectGame } from "./ObjectGame";
import { Pipe } from "./Pipe";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";

export class GamePlaySceneFlappyBird extends Scene {
    bird!: {objectGame:Sprite};
    textScore!: {objectGame:ObjectGame};
    pipeDown!: {objectGame:Pipe[]};
    pipeUp!: {objectGame:Pipe[]};
    score!: number;
    isGameOver!:boolean;
    isFly!: boolean;
    gravity!:number;
    gap!:number;
    lastTimeGeneratePipe!:number;
    timeFly!:number;
    degree!:number;
    constructor() {
        super();
        this.bird = {objectGame: new Sprite('.sky','bird','div',220,180,60,45)};
        this.bird.objectGame.image.push("flappyBird.png");
        this.bird.objectGame.image.push("birdWingDown.png");
        this.textScore = {objectGame: new ObjectGame('.gameContainer','counterScore','div',220,570,100,45)};
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 3;
        this.gap = 450;
        this.lastTimeGeneratePipe = 0;
        this.isFly = false;
        this.timeFly = 0;
        this.degree = 0;
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
            if(this.pipeDown.objectGame[i].left > this.bird.objectGame.left - 20 && this.pipeDown.objectGame[i].left < this.bird.objectGame.left + 60
                && (this.bird.objectGame.bottom < this.pipeDown.objectGame[i].bottom + 153 || 
                     this.bird.objectGame.bottom > this.pipeDown.objectGame[i].bottom + this.gap - 200) 
                        || this.bird.objectGame.bottom <= 0) {
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
        if(this.bird.objectGame.bottom < 500) {
            this.bird.objectGame.bottom += 60;
            this.bird.objectGame.left += 3;
            this.degree -= 60;
            this.timeFly = -0.03;
        }
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
            this.timeFly += 0.03;
            this.degree += 2;
            if(this.degree > 30) {
                this.degree = 30;
            } else {
                if(this.degree < -30) {
                    this.degree = -30;
                }
            }
            this.bird.objectGame.bottom -= this.gravity*this.timeFly;
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
        this.bird.objectGame.left = 220;
        this.timeFly = 0;
        this.degree = 0;
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
        this.renderer.renderSprite(this.bird);
        this.renderer.renderObject(this.textScore);
        this.bird.objectGame.object.style.transform = "rotate(" + this.degree + 'deg)';
        this.textScore.objectGame.object.innerHTML = this.score.toString();
        if(this.pipeDown.objectGame.length > 0) {
            this.renderer.renderManyObjects(this.pipeDown);
            this.renderer.renderManyObjects(this.pipeUp);
        }
    }
}