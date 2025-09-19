import { Transform } from "./transform.js"

export class SceneObject {
    constructor() {
        this.transform = new Transform();
        this.visible = true;
        this.children = [];
        this.name = "untitled sceneObject";
    }

    addChild(sceneObject) {
        this.children.push(sceneObject);
    }

    removeChild(sceneObject) {
        const index = this.children.indexOf(sceneObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
}