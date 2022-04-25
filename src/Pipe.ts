import { ObjectGame } from "./ObjectGame";

export class Pipe extends ObjectGame {
    updateCheck!: boolean;
    constructor(parrentId:string, className:string, objectId:string, left:number, bottom:number, width:number, height:number) {
        super(parrentId,className,objectId,left,bottom,width,height);
        this.updateCheck = false;
    }
}