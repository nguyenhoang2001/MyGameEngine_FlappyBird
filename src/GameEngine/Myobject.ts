export class Myobject {
    x:number;
    y:number;
    width:number;
    height:number;
    image:string;
    objectType:string;
    text:string;
    degree:number;
    constructor(x:number, y:number, width:number, height:number, degree:number,image:string,objectType:string, text:string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.degree = degree;
        this.image = image;
        this.objectType = objectType;
        this.text = text;
    }
}