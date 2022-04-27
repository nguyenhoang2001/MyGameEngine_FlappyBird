import { Myobject } from "./Myobject";
import { MyRenderer} from "./MyRenderer";

export class Scene {
    changeScene!:boolean;
    myRender:MyRenderer;
    children:Myobject[];
    constructor() {
        this.myRender = new MyRenderer('.sky');
        this.changeScene = false;
        this.children = [];
    }
    inputProcessing() {}
    startScene() {}
    update(time: number, delta: number) {}
    add(object:Myobject) {
        this.children.push(object);
    }
    render() {
        if(this.children.length > 0) {
            this.myRender.clear();
            this.myRender.renderManyObjects(this.children);
            this.children = [];
        }
    }
}