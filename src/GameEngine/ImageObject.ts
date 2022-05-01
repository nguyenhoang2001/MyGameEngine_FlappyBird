import { ImageObjectInterface } from "./GameEngineInterfaces/ImageObjectInterface";
import { MyObject } from "./MyObject";

export class ImageObject extends MyObject  implements ImageObjectInterface {
    image: string;
    degree: number;
    constructor(x:number,y:number,width:number,height:number,image:string,degree:number) {
        super(x,y,width,height);
        this.image = image;
        this.degree = degree;
    }
}