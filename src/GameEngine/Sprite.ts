import { Myobject} from "./Myobject";

export class Sprite extends Myobject {
    frames!:string[];
    indexImage!:number;
    constructor(x:number,y:number,width:number,height:number,degree:number,image:string,objectType:string,text:string) {
        super(x,y,width,height,degree,image,objectType,text);
        this.frames = [];
        this.indexImage = 0;
    }
    updateFrame() {
        if(this.frames.length > 0) {
            if(this.indexImage < 0 || this.indexImage >= this.frames.length)
                this.indexImage = 0;
            this.image = this.frames[this.indexImage];
            this.indexImage+=1;
        }
    }
}
