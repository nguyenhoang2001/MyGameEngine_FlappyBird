import { EndingScene } from "./EndingScene";
import { Game } from "./Game";
import { GamePlayScene } from "./GamePlayScene";
import { StartScene } from "./StartScene";

export var passingScore = {score: 0};

export class MyGame extends Game {
    startScene:StartScene;
    gamePlayScene:GamePlayScene;
    endingScene:EndingScene;

    constructor() {
        super();
        this.startScene = new StartScene();
        this.gamePlayScene = new GamePlayScene();
        this.endingScene = new EndingScene();
        this.scenes.addScene(this.startScene);
        this.scenes.addScene(this.gamePlayScene);
        this.scenes.addScene(this.endingScene);
    }
}