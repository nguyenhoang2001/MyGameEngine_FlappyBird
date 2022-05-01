import { MyObjetInterface } from "./MyObjectInterface";

export interface SpriteObjectInterface extends MyObjetInterface {
    image:string;
    degree:number;
    frames:string[];
    indexImage:number;
    updateFrame():void;
}