import { MyObject } from "./MyObject";

export class ImageObject extends MyObject {
    image: string;
    degree: number;
    constructor(x:number,y:number,width:number,height:number,image:string,degree:number) {
        super(x,y,width,height);
        this.image = image;
        this.degree = degree;
    }
}