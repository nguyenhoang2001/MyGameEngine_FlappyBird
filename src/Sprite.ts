import { ObjectGame } from "./ObjectGame";

export class Sprite extends ObjectGame {
    image!:string[];
    indexImage!:number;
    constructor(parrentId:string, className:string, objectId:string, left:number, bottom:number, width:number, height:number) {
        super(parrentId,className,objectId,left,bottom,width,height);
        this.indexImage = 0;
        this.image = [];
    }
}