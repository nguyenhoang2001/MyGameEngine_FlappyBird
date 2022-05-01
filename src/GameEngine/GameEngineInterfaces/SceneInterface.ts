export interface SceneInterface {
    changeScene:boolean;
    startRender():void;
    startScene():void;
    endRender():void;
    inputProcessing():void;
    update(time: number, delta: number):void;
    render():void;
}