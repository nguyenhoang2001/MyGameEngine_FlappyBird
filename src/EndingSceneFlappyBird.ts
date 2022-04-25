import { passingScore } from "./FlappyBirdGame";
import { ObjectGame } from "./ObjectGame";
import { Scene } from "./Scene";

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
        this.updateNewScore(passingScore.score);
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