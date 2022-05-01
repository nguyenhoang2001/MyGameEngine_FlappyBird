import { GameInterface } from "./GameEngineInterfaces/GameInterface";
import { Scene } from "./Scene";
import { SceneInterface } from "./GameEngineInterfaces/SceneInterface";
import { SceneManager } from "./SceneManager";
import { SceneManagerInterface } from "./GameEngineInterfaces/SceneManagerInterface";

export abstract class Game implements GameInterface {
    private scenes: SceneManagerInterface;
    private lastTime: number;
    constructor() {
        this.scenes = new SceneManager();
        this.lastTime = window.performance.now();
    }

    start() {
        this.lastTime = window.performance.now();
        this.scenes.startScene();
        requestAnimationFrame(()=>this.loop());
    }

    private loop() {
        var delta = window.performance.now() - this.lastTime;
        var time = window.performance.now();
        this.scenes.inputProcessing();
        this.scenes.update(time, delta);
        this.scenes.render();
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop());
    }

    protected addScene(scene: SceneInterface) {
        this.scenes.addScene(scene);
    }
}