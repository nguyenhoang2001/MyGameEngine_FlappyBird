
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
            console.log('the next scene index: ' + this.currentIndex);
            this.startScene();
        }
    }

    render() {
        this.scenes[this.currentIndex].render();
        //this.changeScene();
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
        //this.constructGameEngine();
        this.lastTime = window.performance.now();
        this.scenes.startScene();
        requestAnimationFrame(()=>this.loop());
    }

    loop() {
        var delta = window.performance.now() - this.lastTime;
        var time = window.performance.now();
        // this.input.update(time, delta)
        this.scenes.update(time, delta);
        this.scenes.render();
        this.lastTime = time;
        requestAnimationFrame(()=>this.loop());
    }

    addScene(scene: Scene) {
        this.scenes.addScene(scene);
    }
}

export class StartSceneFlappyBird extends Scene {
    startButton!: {objectGame:ObjectGame};
    constructor() {
        super();
        this.startButton = {objectGame: new ObjectGame('.game-container','start-button',"BUTTON",175,330,200,50)};
    }

    initInputEvent() {
        this.startButton.objectGame.object.onclick = () => { 
            this.changeScene = true;
            this.startButton.objectGame.object.remove();
        }
    }

    update(time: number, delta: number): void {

    }

    startScene(): void {
        this.startButton.objectGame.configureObject();
        this.startButton.objectGame.object.innerText = 'Play';
        this.initInputEvent();
    }

    render(): void {
        this.renderer.renderObject(this.startButton);
    }
}

export class EndingSceneFlappyBird extends Scene {
    textScore!: {objectGame:ObjectGame};
    textHighScore!: {objectGame:ObjectGame};
    restartButton!: {objectGame:ObjectGame};
    score: number;
    highScore:number;
    constructor() {
        super();
        this.score = 0;
        this.highScore = 0;
        this.textScore = {objectGame: new ObjectGame('.game-container', 'text_score','div',180,430,200,45)};
        this.textHighScore = {objectGame: new ObjectGame('.game-container', 'high_score','div',180,520,200,45)};
        this.restartButton = {objectGame: new ObjectGame('.game-container', 'restart-button','BUTTON',175,330,200,50)};
    }

    initInputEvent() {
        this.restartButton.objectGame.object.onclick = () => {
            this.changeScene = true;
            this.textScore.objectGame.object.remove();
            this.textHighScore.objectGame.object.remove();
            this.restartButton.objectGame.object.remove();
        }
    }

    startScene(): void {
        this.textScore.objectGame.configureObject();
        this.textHighScore.objectGame.configureObject();
        this.restartButton.objectGame.configureObject();
        this.updateNewScore(passingScore);
        this.textScore.objectGame.object.innerHTML = 'Your score: ' + this.score.toString();
        this.textHighScore.objectGame.object.innerHTML = 'High score: ' + this.highScore.toString();
        this.restartButton.objectGame.object.innerText = 'Play again';
        this.initInputEvent();
    }

    updateNewScore(newScore:number) {
        this.score = newScore;
        if(this.highScore < newScore) {
            this.highScore = newScore;
        }
    }

    render(): void {
        this.renderer.renderObject(this.textScore);
        this.renderer.renderObject(this.textHighScore);
        this.renderer.renderObject(this.restartButton);
    }
}

class Pipe extends ObjectGame {
    updateCheck!: boolean;
    constructor(parrentId:string, className:string, objectId:string, left:number, bottom:number, width:number, height:number) {
        super(parrentId,className,objectId,left,bottom,width,height);
        this.updateCheck = false;
    }
}

export class GamePlaySceneFlappyBird extends Scene {
    bird!: {objectGame:ObjectGame};
    textScore!: {objectGame:ObjectGame};
    pipeDown!: {objectGame:Pipe[]};
    pipeUp!: {objectGame:Pipe[]};
    score!: number;
    isGameOver!:boolean;
    gravity!:number;
    gap!:number;
    lastTimeGeneratePipe!:number;
    constructor() {
        super();
        this.bird = {objectGame: new ObjectGame('.sky','bird','div',220,180,60,45)};
        this.textScore = {objectGame: new ObjectGame('.game-container','counter_score','div',220,570,100,45)};
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 2;
        this.gap = 450;
        this.lastTimeGeneratePipe = 0;
    }

    generatePipe() {
        let randomHeight = Math.random() * 60;
        this.pipeDown.objectGame.push(new Pipe('.game-container','obstacle','div',500,randomHeight,60,300));
        this.pipeUp.objectGame.push(new Pipe('.game-container','topObstacle','div',500,randomHeight + this.gap,60,300));
        let lengthPipe = this.pipeDown.objectGame.length;
        this.pipeDown.objectGame[lengthPipe].configureObject();
        this.pipeUp.objectGame[lengthPipe].configureObject();
    }

    moveObstacle() {
        for(let i = 0; i < this.pipeDown.objectGame.length; i++) {
            this.pipeDown.objectGame[i].left -= 2;
            this.pipeUp.objectGame[i].left -= 2;
            if(this.pipeDown.objectGame[i].updateCheck == false) {
                if(this.pipeDown.objectGame[i].left + 60 <= this.bird.objectGame.left) {
                    this.score += 1;
                    console.log('Your score: '+this.score);
                    this.pipeDown.objectGame[i].updateCheck = true;
                    this.pipeUp.objectGame[i].updateCheck = true;
                }
            }
        }
        if(this.pipeDown.objectGame.length > 0 && this.pipeDown.objectGame[0].left == -60) {
            this.pipeDown.objectGame[0].object.remove();
            this.pipeUp.objectGame[0].object.remove();
            this.pipeDown.objectGame.shift();
            this.pipeUp.objectGame.shift();
        }
        /// game over.....
    }

    initInputEvent() {
        document.addEventListener('click', () => {
            if(this.bird.objectGame.bottom < 500)
                this.bird.objectGame.bottom += 50;
        });
    }

    startScene(): void {
        this.score = 0;
        this.isGameOver = false;
        this.bird.objectGame.bottom = 180;
        this.pipeDown = {objectGame: []};
        this.pipeUp = {objectGame: []};
        this.bird.objectGame.configureObject();
        this.textScore.objectGame.configureObject();
        this.textScore.objectGame.object.innerHTML = this.score.toString();
        this.lastTimeGeneratePipe = window.performance.now();
        this.generatePipe();
    }

    render(): void {
        this.renderer.renderObject(this.bird);
        this.renderer.renderObject(this.textScore);
        this.renderer.renderManyObjects(this.pipeDown);
        this.renderer.renderManyObjects(this.pipeUp);
    }
}

let passingScore = 0;

export class FlappyBirdGame extends Game {
    startScene:StartSceneFlappyBird;
    endingScene:EndingSceneFlappyBird;
    constructor() {
        super();
        this.startScene = new StartSceneFlappyBird();
        this.endingScene = new EndingSceneFlappyBird();
        this.scenes.addScene(this.startScene);
        this.scenes.addScene(this.endingScene);
    }
}