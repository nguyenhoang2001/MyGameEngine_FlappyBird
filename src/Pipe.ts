import { ImageObject } from "./GameEngine/ImageObject";
import { PipeInterface } from "./MyGameInterfaces/PipeInterface";

export class Pipe extends ImageObject implements PipeInterface {
    updateCheck: boolean;
    constructor(x:number,y:number,width:number,height:number,image:string,degree:number) {
        super(x,y,width,height,image,degree);
        this.updateCheck = false;
    }
}