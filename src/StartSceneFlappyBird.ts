import { ObjectGame } from "./ObjectGame";
import { Scene } from "./Scene";


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



