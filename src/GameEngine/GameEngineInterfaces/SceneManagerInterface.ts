import { SceneInterface } from "./SceneInterface";

export interface SceneManagerInterface {
    addScene(scene:SceneInterface):void;
    startScene():void;
    inputProcessing():void;
    update(time:number, delta:number):void;
    render():void;
}