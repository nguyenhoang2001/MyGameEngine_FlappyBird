import { ButtonObject } from "./GameEngine/ButtonObject";
import { ButtonObjectInterface } from "./GameEngine/GameEngineInterfaces/ButtonObjectInterface";
import { MyObject} from "./GameEngine/MyObject";
import { Scene } from "./GameEngine/Scene";
import { TextObject } from "./GameEngine/TextObject";
import { TextObjectInterface } from "./GameEngine/GameEngineInterfaces/TextObjectInterface";

let passingScore = 0;
export function updatePassingScore(newScore:number) {
    passingScore = newScore;
}
export class EndingScene extends Scene {
    private textScore:TextObjectInterface;
    private textHighScore:TextObjectInterface;
    private rePlayButton:ButtonObjectInterface;
    private score:number;
    private highScore:number;
    private isRestart:boolean;
    constructor() {
        super();
        this.score = 0;
        this.isRestart = false;
        this.highScore = 0;
        this.textScore = new TextObject(400,255,200,45,'Your score: ');
        this.textHighScore = new TextObject(400,165,200,45,'High score: ');
        this.rePlayButton = new ButtonObject(400,350,200,50,'Play again',27);
    }

    private getMousePos(canvas:any, event: any) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    private isInside(pos:any, object:MyObject) {
        return pos.x > object.x && pos.x < object.x+object.width && 
        pos.y < object.y +object.height && pos.y > object.y;
    }

    private isClick(event:any) {
        var mousePos = this.getMousePos(this.myRender.canvas, event);
        if(this.isInside(mousePos, this.rePlayButton)) {
            this.isRestart = true;
        } else {
            this.isRestart = false;
        }
    }

    private initInputEvent() {
        this.myRender.canvas.addEventListener('click',(event) => {
            this.isClick(event);
        })
    }

    inputProcessing(): void {
        if(this.isRestart == true) {
            this.changeScene = true;
            this.myRender.canvas.removeEventListener('click',(event) => {
                this.isClick(event);
            })
            // this.myRender.end();
            this.isRestart = false;
        }
    }

    startScene(): void {
        this.isRestart = false;
        // this.myRender.start();
        this.updateNewScore(passingScore);
        this.textScore.text = 'Your score: ' + this.score;
        this.textHighScore.text = 'High score: ' + this.highScore;
        this.initInputEvent();
    }

    update(time: number, delta: number): void {
        this.addObjects();
    }

    private addObjects() {
        this.addButton(this.rePlayButton);
        this.addText(this.textScore);
        this.addText(this.textHighScore);
    }

    updateNewScore(newScore:number) {
        this.score = newScore;
        if(this.highScore < newScore) {
            this.highScore = newScore;
        }
    }
}