// import { ending_scene } from "./ending_scene";
// import { gameplay_scene } from "./gameplay_scene";
// import { start_scene } from "./start_scene";

import { FlappyBirdGame } from "./gameEngine";

// var stateScene = 2;
// var change_Scene = false;
// let startScene = new start_scene();
// let gameplayScene = new gameplay_scene();
// let endingScene = new ending_scene();

// export function change_to_next_scene(newStateScene:number, check_change_Scene: boolean)
// {
//     stateScene = newStateScene;
//     change_Scene = check_change_Scene;
// }

// function setup() {
//     if(change_Scene == true)
//         change_Scene = false;
//     if(stateScene == 0) {
//         gameplayScene.gameplay_scene_setup();
//     } else if(stateScene == 1) {
//         endingScene.ending_scene_setup();
//     } else {
//         startScene.start_scence_setup();
//     }
// }

// function processInput() {
//     if(stateScene == 0) {
//         gameplayScene.gameplay_scene_proccessInput();
//     }
// }

// function update(time:number,delta:number)
// {
//     if(stateScene == 0) {
//         gameplayScene.gameplay_scence_update(time,delta);
//     }
// }

// function render() {
//     if(stateScene == 0) {
//         gameplayScene.gameplay_scene_render();
//         if(change_Scene == true) {
//             endingScene.updateNewScore(gameplayScene.get_currentScore());
//             setup();
//         }
//     }
//     else if (stateScene == 1) {
//         endingScene.ending_scene_render();
//         if(change_Scene == true) {
//             setup();
//         }
//     }
//     else {
//         startScene.start_scence_render();
//         if(change_Scene == true) {
//             setup();
//         }
//     }
// }

// setup()
// let lastTime = window.performance.now();
// function loop() {
//     var time = window.performance.now();
//     var delta = time - lastTime;
//     processInput();
//     update(time, delta);
//     render();
//     lastTime = time;
//     requestAnimationFrame(loop)
// }
// requestAnimationFrame(loop)

let flappyBirdGame = new FlappyBirdGame();
flappyBirdGame.start();