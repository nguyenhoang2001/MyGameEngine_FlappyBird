import { MyObject } from "./MyObject";

export class TextObject extends MyObject {
    text:string;
    constructor(x:number,y:number,width:number,height:number,text:string) {
        super(x,y,width,height);
        this.text = text;
    }
}