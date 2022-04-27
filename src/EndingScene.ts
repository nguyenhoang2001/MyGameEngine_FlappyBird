import { Myobject} from "./GameEngine/Myobject";
import { Scene } from "./GameEngine/Scene";

let passingScore = 0;
export function updatePassingScore(newScore:number) {
    passingScore = newScore;
}
export class EndingScene extends Scene {
    textScore:Myobject;
    textHighScore:Myobject;
    rePlayButton:Myobject;
    score: number;
    highScore:number;
    isRestart!:boolean;
    constructor() {
        super();
        this.score = 0;
        this.isRestart = false;
        this.highScore = 0;
        this.textScore = new Myobject(400,255,200,45,0,'','text','Your score: ');
        this.textHighScore = new Myobject(400,165,200,45,0,'','text','High score: ');
        this.rePlayButton = new Myobject(400,350,200,50,0,'','button','Play again');
    }

    getMousePos(canvas:any, event: any) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    isInside(pos:any, object:Myobject) {
        return pos.x > object.x && pos.x < object.x+object.width && 
        pos.y < object.y +object.height && pos.y > object.y;
    }

    isClick(event:any) {
        var mousePos = this.getMousePos(this.myRender.canvas, event);
        if(this.isInside(mousePos, this.rePlayButton)) {
            this.isRestart = true;
        } else {
            this.isRestart = false;
        }
    }

    initInputEvent() {
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
            this.myRender.end();
            this.isRestart = false;
        }
    }

    startScene(): void {
        this.isRestart = false;
        this.myRender.start();
        this.updateNewScore(passingScore);
        this.textScore.text = 'Your score: ' + this.score;
        this.textHighScore.text = 'High score: ' + this.highScore;
        this.initInputEvent();
    }
    update(time: number, delta: number): void {
        this.addObjects();
    }
    addObjects() {
        this.add(this.rePlayButton);
        this.add(this.textScore);
        this.add(this.textHighScore);
    }
    updateNewScore(newScore:number) {
        this.score = newScore;
        if(this.highScore < newScore) {
            this.highScore = newScore;
        }
    }
}