import { Scene } from "./Scene";

export class SceneManager {
    scenes: Scene[];
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

    addScene(scene: Scene) {
        this.scenes.push(scene)
    }

    startScene() {
        if(this.scenes.length > 0)
            this.scenes[this.currentIndex].startScene();
    }

    changeScene() {
        if(this.scenes[this.currentIndex].changeScene == true) {
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