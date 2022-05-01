import { ButtonObject } from "./ButtonObject";
import { ButtonObjectInterface } from "./GameEngineInterfaces/ButtonObjectInterface";
import { ImageObject } from "./ImageObject";
import { ImageObjectInterface } from "./GameEngineInterfaces/ImageObjectInterface";
import { MyObjetInterface } from "./GameEngineInterfaces/MyObjectInterface";
import { MyRendererInterface } from "./GameEngineInterfaces/MyRendererInterface";
import { SpriteObject } from "./SpriteObject";
import { SpriteObjectInterface } from "./GameEngineInterfaces/SpriteObjectInterface";
import { TextObject } from "./TextObject";
import { TextObjectInterface } from "./GameEngineInterfaces/TextObjectInterface";

export class MyRenderer implements MyRendererInterface {
    canvas: HTMLCanvasElement;
    parentId:string;
    constructor(parentId:string) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1000;
        this.canvas.height = 730;
        this.parentId = parentId;
    }

    start() {
        let objectContainer = document.querySelector(this.parentId) as HTMLInputElement;
        objectContainer.appendChild(this.canvas);
    }

    end() {
        this.canvas.remove();
    }

    clear() {
        let context = this.canvas.getContext("2d")!;
        context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    renderManyImageObjects(object:ImageObjectInterface[]|SpriteObjectInterface[]) {
        for(let i = 0; i < object.length; i++) {
            this.renderImage(object[i]);
        }
    }

    renderManyButtonObjects(object:ButtonObjectInterface[]) {
        for(let i = 0; i < object.length; i++) {
            this.renderButton(object[i]);
        }
    }

    renderManyTextObjects(object:TextObjectInterface[]) {
        for(let i = 0; i < object.length; i++) {
            this.renderText(object[i]);
        }        
    }

    roundRect(ctx:any, x:number, y:number, width:number, height:number, radius:any, fill:boolean) {
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } 
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
    }

    renderText(object:TextObjectInterface) {
        let context = this.canvas.getContext("2d")!;
        context.save();
        context.rect(object.x,object.y,object.width,object.height);
        context.font = '25pt Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#000000'
        context.strokeText(object.text, object.x +object.width/2, object.y+ object.height/2);
        context.fillStyle = '#FFFFFF';
        context.fillText(object.text, object.x +object.width/2, object.y+ object.height/2);
        context.restore();
    }

    renderButton(object:ButtonObjectInterface) {
        let context = this.canvas.getContext("2d")!;
        context.save();
        context.fillStyle = '#FFFF00';
        this.roundRect(context, object.x, object.y, object.width, object.height, object.borderRadius, true);
        context.font = '15pt Arial';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = '#000000';
        context.fillText(object.text,object.x+object.width/2,object.y+object.height/2);
        context.restore();
    }

    renderImage(object:ImageObjectInterface|SpriteObjectInterface) {
        let context = this.canvas.getContext("2d")!;
        let image = document.createElement("img");
        image.setAttribute("src",object.image);
        context.save();
        let rad = object.degree * Math.PI/180;
        context.translate(object.x + object.width/2, object.y + object.height/2);
        context.rotate(rad);
        context.drawImage(image,object.width/2*(-1),object.height/2 * (-1), object.width, object.height);
        context.restore();
    }
}