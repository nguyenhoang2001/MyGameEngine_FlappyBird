import { MyRenderer} from "./MyRenderer";

export class Scene {
    changeScene!:boolean;
    myRender:MyRenderer;
    constructor() {
        this.myRender = new MyRenderer('.sky');
        this.changeScene = false;
    }
    inputProcessing() {}
    startScene() {}
    update(time: number, delta: number) {}
    render() {}
}