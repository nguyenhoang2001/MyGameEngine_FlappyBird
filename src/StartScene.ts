import { ButtonObject } from "./GameEngine/ButtonObject";
import { ButtonObjectInterface } from "./GameEngine/GameEngineInterfaces/ButtonObjectInterface";
import { MyObject} from "./GameEngine/MyObject";
import { Scene } from "./GameEngine/Scene";

export class StartScene extends Scene {
    private isStart:boolean;
    private playButton:ButtonObjectInterface;
    constructor() {
        super();
        this.isStart = false;
        this.playButton = new ButtonObject(400,350,200,50,'Play',27);
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
        if(this.isInside(mousePos, this.playButton)) {
            this.isStart = true;
        } else {
            this.isStart = false;
        }
    }

    private initInputEvent() {
        this.myRender.canvas.addEventListener('click',(event) => {
            this.isClick(event);
        })
    }

    inputProcessing(): void {
        if(this.isStart == true) {
            this.changeScene = true;
            this.myRender.canvas.removeEventListener('click',(event) => {
                this.isClick(event);
            })
            // this.myRender.end();
            this.isStart = false;
        }
    }

    update(time: number, delta: number): void {
        this.addObjects();
    }

    private addObjects() {
        this.addButton(this.playButton);
    }

    startScene(): void {
        this.isStart = false;
        this.initInputEvent();
    }
}