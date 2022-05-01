import { MyObject } from "./MyObject";
import { TextObjectInterface } from "./GameEngineInterfaces/TextObjectInterface";

export class TextObject extends MyObject implements TextObjectInterface {
    text:string;
    constructor(x:number,y:number,width:number,height:number,text:string) {
        super(x,y,width,height);
        this.text = text;
    }
}