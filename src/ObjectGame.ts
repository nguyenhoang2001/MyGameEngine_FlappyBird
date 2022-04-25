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