import { EndingSceneFlappyBird } from "./EndingSceneFlappyBird";
import { Game } from "./Game";
import { GamePlaySceneFlappyBird } from "./GamePlaySceneFlappyBird";
import { StartSceneFlappyBird } from "./StartSceneFlappyBird";

export var passingScore = {score: 0};

export class FlappyBirdGame extends Game {
    startScene:StartSceneFlappyBird;
    gamePlayScene:GamePlaySceneFlappyBird;
    endingScene:EndingSceneFlappyBird;

    constructor() {
        super();
        this.startScene = new StartSceneFlappyBird();
        this.gamePlayScene = new GamePlaySceneFlappyBird();
        this.endingScene = new EndingSceneFlappyBird();
        this.scenes.addScene(this.startScene);
        this.scenes.addScene(this.gamePlayScene);
        this.scenes.addScene(this.endingScene);
    }
}