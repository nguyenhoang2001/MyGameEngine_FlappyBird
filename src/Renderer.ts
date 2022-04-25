import { ObjectGame } from "./ObjectGame";
import { Sprite } from "./Sprite";

export class Renderer {
    firstTimeChangeImage!:boolean;
    timePreviousChangeImage!:number;
    enableChangeImage!: boolean;
    constructor() {
        this.firstTimeChangeImage = true;
        this.timePreviousChangeImage = 0;
        this.enableChangeImage = false;
    }
    renderManyObjects(model:{objectGame:ObjectGame[]}) {
        for(let i = 0; i < model.objectGame.length; i++) {
            this.renderObject({objectGame:model.objectGame[i]});
        }
    }

    renderObject(model:{objectGame:ObjectGame}) {
        model.objectGame.object.style.width = model.objectGame.width + 'px';
        model.objectGame.object.style.height = model.objectGame.height + 'px';
        model.objectGame.object.style.left = model.objectGame.left + 'px';
        model.objectGame.object.style.bottom = model.objectGame.bottom + 'px';
    }

    renderSprite(model:{objectGame:Sprite}) {
        model.objectGame.object.style.width = model.objectGame.width + 'px';
        model.objectGame.object.style.height = model.objectGame.height + 'px';
        model.objectGame.object.style.left = model.objectGame.left + 'px';
        model.objectGame.object.style.bottom = model.objectGame.bottom + 'px';
        if(this.firstTimeChangeImage == true) {
            this.timePreviousChangeImage = window.performance.now();
            this.enableChangeImage = true;
            this.firstTimeChangeImage = false;
        } else {
            let currentTime = window.performance.now();
            if(currentTime - this.timePreviousChangeImage >= 100) {
                this.enableChangeImage = true;
                this.timePreviousChangeImage = currentTime;
            }
        }
        if(this.enableChangeImage == true) {
            this.enableChangeImage = false;
            if(model.objectGame.image.length > 0) {
                    model.objectGame.object.style.backgroundImage = "url('" + model.objectGame.image[model.objectGame.indexImage] + "')";
                    if(model.objectGame.indexImage + 1 >= model.objectGame.image.length) {
                        model.objectGame.indexImage = 0;
                    } else {
                        model.objectGame.indexImage += 1;
                    }
            }
        }
        
    }
}