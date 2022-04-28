import { ImageObject } from "./GameEngine/ImageObject";


export class Pipe extends ImageObject {
    updateCheck!: boolean;
    constructor(x:number,y:number,width:number,height:number,image:string,degree:number) {
        super(x,y,width,height,image,degree);
        this.updateCheck = false;
    }
}