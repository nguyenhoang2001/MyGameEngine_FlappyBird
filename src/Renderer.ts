import { ObjectGame } from "./ObjectGame";

export class Renderer {
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
}