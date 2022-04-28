import { MyObject } from "./MyObject";

export class ButtonObject extends MyObject {
    text: string;
    borderRadius: number;
    constructor(x:number,y:number,width:number,height:number,text:string,borderRadius:number) {
        super(x,y,width,height);
        this.text = text;
        this.borderRadius = borderRadius;
    }
}