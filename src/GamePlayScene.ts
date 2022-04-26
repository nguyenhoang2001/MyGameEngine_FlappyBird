import { passingScore } from "./MyGame";
import { ObjectGame } from "./ObjectGame";
import { Pipe } from "./Pipe";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";

export class GamePlayScene extends Scene {
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
    degreeRotate!:number;
    height!:number;
    velocity!:number;
    degreeFly!:number;
    isFlyUp!:boolean;
    constructor() {
        super();
        this.bird = {objectGame: new Sprite('.sky','bird','div',220,180,60,45)};
        this.bird.objectGame.image.push("flappyBird.png");
        this.bird.objectGame.image.push("birdWingDown.png");
        this.textScore = {objectGame: new ObjectGame('.gameContainer','counterScore','div',446,570,100,45)};
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 20;
        this.gap = 450;
        this.lastTimeGeneratePipe = 0;
        this.isFly = false;
        this.degreeRotate = 0;
        this.height = 180;
        this.velocity = 12;
        this.degreeFly = 30;
        this.isFlyUp = false;
    }

    generatePipe() {
        let randomHeight = Math.random() * 60;
        this.pipeDown.objectGame.push(new Pipe('.gameContainer','obstacle','div',1000,randomHeight,60,300));
        this.pipeUp.objectGame.push(new Pipe('.gameContainer','topObstacle','div',1000,randomHeight + this.gap,60,300));
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
            this.pipeDown.objectGame[i].x -= 2;
            this.pipeUp.objectGame[i].x -= 2;
            if(this.pipeDown.objectGame[i].updateCheck == false) {
                if(this.pipeDown.objectGame[i].x + 60 <= this.bird.objectGame.x) {
                    this.score += 1;
                    console.log('Your score: '+this.score);
                    this.pipeDown.objectGame[i].updateCheck = true;
                    this.pipeUp.objectGame[i].updateCheck = true;
                }
            }
            if(this.pipeDown.objectGame[i].x > this.bird.objectGame.x - 20 && 
                this.pipeDown.objectGame[i].x < this.bird.objectGame.x + 60
                && (this.bird.objectGame.y < this.pipeDown.objectGame[i].y + 153 || 
                     this.bird.objectGame.y > this.pipeDown.objectGame[i].y + this.gap - 200) 
                        || this.bird.objectGame.y <= 0) {
                this.gameOver();
            }
        }
        if(this.pipeDown.objectGame.length > 0 && this.pipeDown.objectGame[0].x == -60) {
            this.pipeDown.objectGame[0].object.remove();
            this.pipeUp.objectGame[0].object.remove();
            this.pipeDown.objectGame.shift();
            this.pipeUp.objectGame.shift();
        }
    }

    fly() {
        this.height = this.bird.objectGame.y + 
        Math.pow(this.velocity, 2)*Math.pow(Math.sin(this.degreeFly), 2);
        this.isFlyUp = true;
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
            this.bird.objectGame.x += this.velocity*Math.cos(this.degreeFly)*delta*0.01;
            if(this.isFlyUp == false) {
                this.degreeRotate += 1;
                if(this.degreeRotate >= 30) {
                    this.degreeRotate = 30;
                }
                this.bird.objectGame.y -= this.gravity*Math.pow(delta*0.01,2)* 2;
            } else {
                this.degreeRotate -= 1;
                if(this.degreeRotate <= -30 ) {
                    this.degreeRotate = -30;
                }
                this.bird.objectGame.y += -1* (this.velocity*Math.sin(this.degreeFly)*delta*0.01
                - this.gravity*Math.pow(delta*0.01,2));
                if(this.bird.objectGame.y >= this.height) {
                    this.isFlyUp = false;
                }
            }
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
        this.bird.objectGame.y = 180;
        this.bird.objectGame.x = 220;
        this.degreeRotate = 0;
        this.height = 0;
        this.velocity = 12;
        this.gravity = 20;
        this.degreeFly = 30;
        this.isFlyUp = false;
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
        this.bird.objectGame.object.style.transform = "rotate(" + this.degreeRotate + 'deg)';
        this.textScore.objectGame.object.innerHTML = this.score.toString();
        if(this.pipeDown.objectGame.length > 0) {
            this.renderer.renderManyObjects(this.pipeDown);
            this.renderer.renderManyObjects(this.pipeUp);
        }
    }
}