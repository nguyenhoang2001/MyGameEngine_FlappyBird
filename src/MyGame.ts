import { EndingScene } from "./EndingScene";
import { Game } from "./GameEngine/Game";
import { GamePlayScene } from "./GamePlayScene";
import { StartScene } from "./StartScene";

export class MyGame extends Game {
    private startScene:StartScene;
    private gamePlayScene:GamePlayScene;
    private endingScene:EndingScene;

    constructor() {
        super();
        this.startScene = new StartScene();
        this.gamePlayScene = new GamePlayScene();
        this.endingScene = new EndingScene();
        this.addScene(this.startScene);
        this.addScene(this.gamePlayScene);
        this.addScene(this.endingScene);
    }
}