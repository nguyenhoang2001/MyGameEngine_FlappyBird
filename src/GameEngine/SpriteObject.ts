import { MyObject} from "./MyObject";
import { SpriteObjectInterface } from "./GameEngineInterfaces/SpriteObjectInterface";

export class SpriteObject extends MyObject implements SpriteObjectInterface {
    frames:string[];
    indexImage:number;
    image: string;
    degree: number;
    constructor(x:number,y:number,width:number,height:number,image:string,degree:number) {
        super(x,y,width,height);
        this.frames = [];
        this.indexImage = 0;
        this.degree = degree;
        this.image = image;
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
