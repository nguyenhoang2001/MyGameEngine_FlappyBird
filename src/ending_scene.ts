// import { inputHandler, renderer } from "./gameEngine";
// import { change_to_next_scene } from "./index";

// var click_play_again = false;
// var gameEngineRenderer = new renderer();
// var gameEngineInputHandler = new inputHandler();

// export class ending_scene {
//     private score: number;
//     private highscore: number;
//     private objectInScene: {object: HTMLElement[]};

//     constructor() {
//         this.objectInScene = {object: []};
//         this.score = 0;
//         this.highscore = 0;
//     }

//     private clickPlayAgain()
//     {
//         click_play_again = true;
//     }

//     updateNewScore(newScore: number)
//     {
//         this.score = newScore;
//         if(this.highscore < newScore)
//             this.highscore = newScore;
//     }

//     ending_scene_setup()
//     {
//         this.objectInScene.object = [];
//         gameEngineRenderer.createObject(this.objectInScene,'.game-container', 'div','text_score');
//         gameEngineRenderer.createObject(this.objectInScene,'.game-container', 'div','high_score');
//         gameEngineRenderer.createObject(this.objectInScene,'.game-container', "BUTTON",'restart-button');
//         gameEngineRenderer.render(this.objectInScene,[200,200,200],[45,45,50],[180,180,175],[430,520,330]);

//         this.objectInScene.object[0].innerHTML = "Your score: " + this.score;
//         this.objectInScene.object[1].innerHTML = "High score: " + this.highscore;
//         this.objectInScene.object[2].innerText = 'Play again';
//         gameEngineInputHandler.setupOnClickButton({object: this.objectInScene.object[2]},this.clickPlayAgain);
//     }

//     ending_scene_render()
//     {
//         if(click_play_again == true)
//         {
//             click_play_again = false;
//             gameEngineRenderer.removeObject(this.objectInScene);
//             change_to_next_scene(0, true);
//         }
//     }   
// }

