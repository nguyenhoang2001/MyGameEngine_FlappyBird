import { Scene } from "./Scene";
import { SceneInterface } from "./GameEngineInterfaces/SceneInterface";
import { SceneManagerInterface } from "./GameEngineInterfaces/SceneManagerInterface";

export class SceneManager implements SceneManagerInterface {
    scenes: SceneInterface[];
    numberScenes!:number;
    currentIndex!:number;
    constructor() {
        this.scenes = [];
        this.numberScenes = this.scenes.length;
        this.currentIndex = 0;
    }

    update(time:number, delta:number) {
        this.scenes[this.currentIndex].update(time,delta);
        this.changeScene();
    }

    inputProcessing() {
        this.scenes[this.currentIndex].inputProcessing();
        this.changeScene();
    }

    addScene(scene: SceneInterface) {
        this.scenes.push(scene)
    }

    startScene() {
        if(this.scenes.length > 0) {
            this.scenes[this.currentIndex].startRender();
            this.scenes[this.currentIndex].startScene();
        }
    }

    changeScene() {
        if(this.scenes[this.currentIndex].changeScene == true) {
            this.scenes[this.currentIndex].endRender();
            this.scenes[this.currentIndex].changeScene = false;
            if(this.currentIndex + 1 >= this.scenes.length) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
            this.startScene();
        }
    }

    render() {
        this.scenes[this.currentIndex].render();
    }
}