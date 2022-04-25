
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

export class Scene {
    renderer!: Renderer;
    changeScene!:boolean;
    constructor() {
        this.renderer = new Renderer();
        this.changeScene = false;
    }
    inputProcessing() {}
    startScene() {}
    update(time: number, delta: number) {}
    render() {}
}

export class SceneManager {
    scenes: Scene[];
    numberScenes!:number;
    currentIndex!:number;
    constructor() {
        this.scenes = [];
        this.numberScenes = this.scenes.length;
        this.currentIndex = 0;
    }

    update(time:number, delta:number) {
        this.scenes[this.currentIndex].update(time,delta);
        this.changeScene();
    }

    inputProcessing() {
        this.scenes[this.currentIndex].inputProcessing();
        this.changeScene();
    }

    addScene(scene: Scene) {
        this.scenes.push(scene)
    }

    startScene() {
        if(this.scenes.length > 0)
            this.scenes[this.currentIndex].startScene();
    }

    changeScene() {
        if(this.scenes[this.currentIndex].changeScene == true) {
            this.scenes[this.currentIndex].changeScene = false;
            if(this.currentIndex + 1 >= this.scenes.length) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
            this.startScene();
        }
    }

    render() {
        this.scenes[this.currentIndex].render();
    }
}

export class ObjectGame {
    parentId!: string;
    objectId!:string;
    object!:HTMLElement;
    left!:number;
    bottom!:number;
    width!:number;
    height!:number;
    className!:string
    constructor(parentId:string, className:string ,objectId:string, left:number, bottom:number, width:number,height:number) {
        this.parentId = parentId;
        this.objectId = objectId;
        this.left = left;
        this.bottom = bottom;
        this.width = width;
        this.height = height;
        this.className = className;
    }
    configureObject() {
        let objectContainer = document.querySelector(this.parentId) as HTMLInputElement;
        this.object = document.createElement(this.objectId);
        this.object.classList.add(this.className);
        objectContainer.appendChild(this.object);
    }
}

export class Game {
    scenes: SceneManager;
    renderer: Renderer;
    lastTime: number;
    constructor() {
        this.scenes = new SceneManager();
        this.renderer = new Renderer();
        this.lastTime = window.performance.now();
    }

    start() {
        this.lastTime = window.performance.now();
        this.scenes.startScene();
        requestAnimationFrame(()=>this.loop());
    }

    loop() {
        var delta = window.performance.now() - this.lastTime;
        var time = window.performance.now();
        this.scenes.inputProcessing();
        this.scenes.update(time, delta);
        this.scenes.render();
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop());
    }

    addScene(scene: Scene) {
        this.scenes.addScene(scene);
    }
}