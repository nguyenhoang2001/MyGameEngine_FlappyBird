import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

export class Game {
    scenes: SceneManager;
    lastTime: number;
    constructor() {
        this.scenes = new SceneManager();
        this.lastTime = window.performance.now();
    }

    start() {
        this.lastTime = window.performance.now();
        this.scenes.startScene();
        requestAnimationFrame(()=>this.loop());
    }

    loop() {
        var delta = window.performance.now() - this.lastTime;
        var time = window.performance.now();
        this.scenes.inputProcessing();
        this.scenes.update(time, delta);
        this.scenes.render();
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop());
    }

    addScene(scene: Scene) {
        this.scenes.addScene(scene);
    }
}