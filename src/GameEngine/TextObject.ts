import { Myobject } from "./Myobject";

export class TextObject extends Myobject {
    text:string;
    constructor(x:number,y:number,width:number,height:number,text:string) {
        super(x,y,width,height);
        this.text = text;
    }
}