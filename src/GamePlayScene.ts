import { updatePassingScore } from "./EndingScene";
import { Pipe } from "./Pipe";
import { Scene } from "./GameEngine/Scene";
import { SpriteObject } from "./GameEngine/SpriteObject";
import { TextObject } from "./GameEngine/TextObject";
import { SpriteObjectInterface } from "./GameEngine/GameEngineInterfaces/SpriteObjectInterface";
import { TextObjectInterface } from "./GameEngine/GameEngineInterfaces/TextObjectInterface";
import { PipeInterface } from "./MyGameInterfaces/PipeInterface";

export class GamePlayScene extends Scene {
    private bird:SpriteObjectInterface;
    private textScore:TextObjectInterface;
    private pipeDown:PipeInterface[];
    private pipeUp:PipeInterface[];
    private score: number;
    private isGameOver!:boolean;
    private isFly: boolean;
    private gravity:number;
    private gap:number;
    private timeGeneratePipe:number;
    private height:number;
    private velocity:number;
    private degreeFly:number;
    private isFlyUp:boolean;
    private timeToChangeFrame:number;
    constructor() {
        super();
        this.bird = new SpriteObject(220,400,60,45,'flappyBird.png',0);
        this.textScore = new TextObject(446,115,100,45,'0');
        this.pipeDown = [];
        this.pipeUp = [];
        this.bird.frames.push('birdWingDown.png');
        this.bird.frames.push('flappyBird.png');
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 20;
        this.gap = 500;//new
        this.timeGeneratePipe = 0;
        this.isFly = false;
        this.timeToChangeFrame = 200;
        this.height = 180;
        this.velocity = 12;
        this.degreeFly = 30;
        this.isFlyUp = false;
    }

    private generatePipe() {
        let randomHeight = Math.random() * 60;
        this.pipeDown.push(new Pipe(1000, 430 - randomHeight, 60,300,'flappyBirdPipe.png',0));
        this.pipeUp.push(new Pipe(1000, 430 - randomHeight - this.gap, 60,300,'flappyBirdPipe.png',180));
    }

    private gameOver() {
        this.isGameOver = true;
        this.changeScene = true;
        this.pipeDown = [];
        this.pipeUp = [];
        // new added
        updatePassingScore(this.score);
        // this.myRender.end();
        document.removeEventListener('click',() => {this.isFly = true;});
        console.log('Game over');
    }

    private moveObstacle() {
        for(let i = 0; i < this.pipeDown.length; i++) {
            this.pipeDown[i].x -= 2;
            this.pipeUp[i].x -= 2;
            if(this.pipeDown[i].updateCheck == false) {
                if(this.pipeDown[i].x + 60 <= this.bird.x) {
                    this.score += 1;
                    this.textScore.text = this.score.toString();
                    console.log('Your score: '+ this.score);
                    this.pipeDown[i].updateCheck = true;
                    this.pipeUp[i].updateCheck = true;
                }
            }
            if(this.pipeDown[i].x > this.bird.x - 20 && 
                this.pipeDown[i].x < this.bird.x + 60
                && (this.bird.y <= this.pipeUp[i].height + this.pipeUp[i].y || 
                     this.bird.y >= this.pipeDown[i].y - this.bird.height) 
                        || this.bird.y >= 580 - this.bird.height) {
                this.gameOver();
            }
        }
        if(this.pipeDown.length > 0 && this.pipeDown[0].x == -60) {
            this.pipeDown.shift();
            this.pipeUp.shift();
        }
    }

    private fly() {
        // new added
        //this.velocity += 2;

        this.height = this.bird.y - 
        Math.pow(this.velocity, 2)*Math.pow(Math.sin(this.degreeFly), 2);
        this.isFlyUp = true;
    }

    private initInputEvent() {
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
            if(this.timeToChangeFrame >= 200) {
                this.bird.updateFrame();
                this.timeToChangeFrame = 0;
            } else 
                this.timeToChangeFrame+= delta;

            this.bird.x += this.velocity*Math.cos(this.degreeFly)*delta*0.01;
            if(this.isFlyUp == false) {
                // new added
                // this.velocity -= 1;
                // if(this.velocity <= 12) this.velocity = 12;

                this.bird.degree += 1;
                if(this.bird.degree >= 30) {
                    this.bird.degree = 30;
                }
                this.bird.y += this.gravity*Math.pow(delta*0.01,2)* 2;
            } else {
                this.bird.degree -= 1;
                if(this.bird.degree <= -30 ) {
                    this.bird.degree = -30;
                }
                this.bird.y += this.velocity*Math.sin(this.degreeFly)*delta*0.01
                - this.gravity*Math.pow(delta*0.01,2);
                if(this.bird.y <= this.height) {
                    this.isFlyUp = false;
                }
            }
            this.moveObstacle();
            let timeInterval = Math.floor(Math.random() * (4000 - 1000 + 1) + 1000);
            if(this.timeGeneratePipe >= timeInterval) {
                this.generatePipe();
                this.timeGeneratePipe = 0;
            } else 
                this.timeGeneratePipe+=delta;
            this.addObjects();
        }
    }

    private addObjects() {
        for(let i = 0; i < this.pipeDown.length; i++) {
            this.addImage(this.pipeDown[i]);
            this.addImage(this.pipeUp[i]);
        }
        this.addSprite(this.bird);
        this.addText(this.textScore);
    }

    startScene(): void {
        this.bird.y = 400;
        this.bird.x = 220;
        this.bird.degree = 0;
        this.textScore.text = '0';
        this.pipeDown = [];
        this.pipeUp = [];
        this.score = 0;
        this.isGameOver = false;
        this.isFly = false;
        this.height = 0;
        this.velocity = 12;
        this.gravity = 20;
        this.degreeFly = 30;
        this.isFlyUp = false;
        this.timeToChangeFrame = 200;
        this.timeGeneratePipe = 0;
        this.initInputEvent();
        this.generatePipe();
        // this.myRender.start();
    }
}