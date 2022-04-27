import { Myobject} from "./GameEngine/Myobject";
import { Scene } from "./GameEngine/Scene";

export class StartScene extends Scene {
    isStart:boolean;
    playButton:Myobject;
    constructor() {
        super();
        this.isStart = false;
        this.playButton = new Myobject(400,350,200,50,0,'','button','Play');
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
        if(this.isInside(mousePos, this.playButton)) {
            this.isStart = true;
        } else {
            this.isStart = false;
        }
    }

    initInputEvent() {
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
            this.myRender.end();
            this.isStart = false;
        }
    }

    update(time: number, delta: number): void {
        this.addObjects();
    }

    addObjects() {
        this.add(this.playButton);
    }

    startScene(): void {
        this.myRender.start();
        this.isStart = false;
        this.initInputEvent();
    }
}



