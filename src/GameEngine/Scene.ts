import { ButtonObject } from "./ButtonObject";
import { ImageObject } from "./ImageObject";
import { MyRenderer} from "./MyRenderer";
import { SpriteObject } from "./SpriteObject";
import { TextObject } from "./TextObject";

export class Scene {
    changeScene!:boolean;
    myRender:MyRenderer;
    imageObjects:ImageObject[];
    spriteObjects:SpriteObject[];
    buttonObjects:ButtonObject[];
    textObjects:TextObject[];
    constructor() {
        this.myRender = new MyRenderer('.sky');
        this.changeScene = false;
        this.imageObjects = [];
        this.spriteObjects = [];
        this.buttonObjects = [];
        this.textObjects = [];
    }
    inputProcessing() {}
    startScene() {}
    update(time: number, delta: number) {}
    addImage(object:ImageObject) {
        this.imageObjects.push(object);
    }
    addSprite(object:SpriteObject) {
        this.spriteObjects.push(object);
    }
    addButton(object:ButtonObject) {
        this.buttonObjects.push(object);
    }
    addText(object:TextObject) {
        this.textObjects.push(object);
    }
    render() {
        this.myRender.clear();
        this.myRender.renderManyImageObjects(this.imageObjects);
        this.myRender.renderManyImageObjects(this.spriteObjects);
        this.myRender.renderManyButtonObjects(this.buttonObjects);
        this.myRender.renderManyTextObjects(this.textObjects);
        this.imageObjects = [];
        this.spriteObjects = [];
        this.buttonObjects = [];
        this.textObjects = [];
    }
}