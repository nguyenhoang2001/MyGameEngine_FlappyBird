import { Renderer } from "./Renderer";

export class Scene {
    renderer!: Renderer;
    changeScene!:boolean;
    constructor() {
        this.renderer = new Renderer();
        this.changeScene = false;
    }
    inputProcessing() {}
    startScene() {}
    update(time: number, delta: number) {}
    render() {}
}