import { Myobject } from "./GameEngine/Myobject";

export class Pipe extends Myobject {
    updateCheck!: boolean;
    constructor(x:number,y:number,width:number,height:number,degree:number,image:string,objectType:string,text:string) {
        super(x,y,width,height,degree,image,objectType,text);
        this.updateCheck = false;
    }
}