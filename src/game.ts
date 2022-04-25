import { Game, ObjectGame, Scene } from "./gameEngine";

export class StartSceneFlappyBird extends Scene {
    startButton!: {objectGame:ObjectGame};
    isStart!:boolean;
    constructor() {
        super();
        this.isStart = false;
        this.startButton = {objectGame: new ObjectGame('.gameContainer','startButton',"BUTTON",175,330,200,50)};
    }

    initInputEvent() {
        this.startButton.objectGame.object.onclick = () => { 
            this.isStart = true;
        }
    }

    inputProcessing(): void {
        if(this.isStart == true) {
            this.changeScene = true;
            this.startButton.objectGame.object.remove();
            this.isStart = false;
        }
    }

    update(time: number, delta: number): void {

    }

    startScene(): void {
        this.isStart = false;
        this.startButton.objectGame.configureObject();
        this.startButton.objectGame.object.innerText = 'Play';
        this.initInputEvent();
    }

    render(): void {
        this.renderer.renderObject(this.startButton);
    }
}

export class EndingSceneFlappyBird extends Scene {
    textScore!: {objectGame:ObjectGame};
    textHighScore!: {objectGame:ObjectGame};
    restartButton!: {objectGame:ObjectGame};
    score: number;
    highScore:number;
    isRestart!:boolean;
    constructor() {
        super();
        this.score = 0;
        this.isRestart = false;
        this.highScore = 0;
        this.textScore = {objectGame: new ObjectGame('.gameContainer', 'textScore','div',180,430,200,45)};
        this.textHighScore = {objectGame: new ObjectGame('.gameContainer', 'highScore','div',180,520,200,45)};
        this.restartButton = {objectGame: new ObjectGame('.gameContainer', 'restartButton','BUTTON',175,330,200,50)};
    }

    initInputEvent() {
        this.restartButton.objectGame.object.onclick = () => {
            this.isRestart = true;
        }
    }

    inputProcessing(): void {
        if(this.isRestart == true) {
            this.changeScene = true;
            this.textScore.objectGame.object.remove();
            this.textHighScore.objectGame.object.remove();
            this.restartButton.objectGame.object.remove();
            this.isRestart = false;
        }
    }

    startScene(): void {
        this.isRestart = false;
        this.textScore.objectGame.configureObject();
        this.textHighScore.objectGame.configureObject();
        this.restartButton.objectGame.configureObject();
        this.updateNewScore(passingScore);
        this.textScore.objectGame.object.innerHTML = 'Your score: ' + this.score.toString();
        this.textHighScore.objectGame.object.innerHTML = 'High score: ' + this.highScore.toString();
        this.restartButton.objectGame.object.innerText = 'Play again';
        this.initInputEvent();
    }

    updateNewScore(newScore:number) {
        this.score = newScore;
        if(this.highScore < newScore) {
            this.highScore = newScore;
        }
    }

    render(): void {
        this.renderer.renderObject(this.textScore);
        this.renderer.renderObject(this.textHighScore);
        this.renderer.renderObject(this.restartButton);
    }
}

class Pipe extends ObjectGame {
    updateCheck!: boolean;
    constructor(parrentId:string, className:string, objectId:string, left:number, bottom:number, width:number, height:number) {
        super(parrentId,className,objectId,left,bottom,width,height);
        this.updateCheck = false;
    }
}

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
        passingScore = this.score;
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

let passingScore = 0;

export class FlappyBirdGame extends Game {
    startScene:StartSceneFlappyBird;
    gamePlayScene:GamePlaySceneFlappyBird;
    endingScene:EndingSceneFlappyBird;

    constructor() {
        super();
        this.startScene = new StartSceneFlappyBird();
        this.gamePlayScene = new GamePlaySceneFlappyBird();
        this.endingScene = new EndingSceneFlappyBird();
        this.scenes.addScene(this.startScene);
        this.scenes.addScene(this.gamePlayScene);
        this.scenes.addScene(this.endingScene);
    }
}