import { Transform } from "./transform.js"

export class SceneObject {
    constructor(cell, ctx) {
        this.transform = new Transform();
        this.renderRect = new Transform();
        this.visible = true;
        this.children = [];
        
        this.name = "untitled sceneObject";

        // rendering
        this.ctx = ctx;
        this.image = new Image();
        this.cell = cell;
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
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

    draw() {
        if (this.visible)
        this.ctx.drawImage(
            this.image,
            this.renderRect.position.x,
            this.renderRect.position.y,
            this.renderRect.size.x,
            this.renderRect.size.y,
            this.transform.position.x,
            this.transform.position.y,
            this.transform.size.x,
            this.transform.size.y);
    }
}