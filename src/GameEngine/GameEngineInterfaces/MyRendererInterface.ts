import { ButtonObjectInterface } from "./ButtonObjectInterface";
import { ImageObjectInterface } from "./ImageObjectInterface";
import { SpriteObjectInterface } from "./SpriteObjectInterface";
import { TextObjectInterface } from "./TextObjectInterface";

export interface MyRendererInterface {
    canvas: HTMLCanvasElement;
    start():void;
    end():void;
    clear():void;
    renderManyImageObjects(object:ImageObjectInterface[]|SpriteObjectInterface[]):void;
    renderManyButtonObjects(object:ButtonObjectInterface[]):void;
    renderManyTextObjects(object:TextObjectInterface[]):void;
}