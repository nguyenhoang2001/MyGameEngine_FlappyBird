import { ButtonObject } from "./ButtonObject";
import { ButtonObjectInterface } from "./GameEngineInterfaces/ButtonObjectInterface";
import { ImageObject } from "./ImageObject";
import { ImageObjectInterface } from "./GameEngineInterfaces/ImageObjectInterface";
import { MyRenderer} from "./MyRenderer";
import { MyRendererInterface } from "./GameEngineInterfaces/MyRendererInterface";
import { SceneInterface } from "./GameEngineInterfaces/SceneInterface";
import { SpriteObject } from "./SpriteObject";
import { SpriteObjectInterface } from "./GameEngineInterfaces/SpriteObjectInterface";
import { TextObject } from "./TextObject";
import { TextObjectInterface } from "./GameEngineInterfaces/TextObjectInterface";

export abstract class Scene implements SceneInterface {
    changeScene:boolean;
    protected myRender:MyRendererInterface;
    private imageObjects:ImageObjectInterface[];
    private spriteObjects:SpriteObjectInterface[];
    private buttonObjects:ButtonObjectInterface[];
    private textObjects:TextObjectInterface[];
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
    startRender() {
        this.myRender.start();
    }
    endRender() {
        this.myRender.end();
    }
    addImage(object:ImageObjectInterface) {
        this.imageObjects.push(object);
    }
    addSprite(object:SpriteObjectInterface) {
        this.spriteObjects.push(object);
    }
    addButton(object:ButtonObjectInterface) {
        this.buttonObjects.push(object);
    }
    addText(object:TextObjectInterface) {
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