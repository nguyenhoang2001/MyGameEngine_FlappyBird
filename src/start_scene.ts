// import { inputHandler, Renderer } from "./gameEngine";
// import { change_to_next_scene } from "./index";

// var click_play = false;

// let gameEngineRenderer = new Renderer();
// let gameEngineInputHandler = new inputHandler();

// export class start_scene {
//     private objectInScene: {object: HTMLElement[]};

//     constructor() {
//         this.objectInScene = {object: []};
//     }

//     private clickPlay()
//     {
//         click_play = true;
//     }

//     start_scence_setup()
//     {
//         // For button
//         gameEngineRenderer.createObject(this.objectInScene,'.game-container',"BUTTON",'start-button');
//         gameEngineRenderer.render(this.objectInScene, [200],[50],[175],[330]);
//         this.objectInScene.object[0].innerText = 'Play';
//         gameEngineInputHandler.setupOnClickButton({object: this.objectInScene.object[0]},this.clickPlay);
//     }

//     start_scence_render()
//     {
//         if(click_play == true)
//         {
//             click_play = false;
//             gameEngineRenderer.removeObject(this.objectInScene);
//             change_to_next_scene(0, true);
//         }
//     }    
// }
