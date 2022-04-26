import { ObjectGame } from "./ObjectGame";

export class Sprite extends ObjectGame {
    image!:string[];
    indexImage!:number;
    constructor(parrentId:string, className:string, objectId:string, x:number, y:number, width:number, height:number) {
        super(parrentId,className,objectId,x,y,width,height);
        this.indexImage = 0;
        this.image = [];
    }
}