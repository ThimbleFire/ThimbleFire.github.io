import { Transform } from "./transform.js";

export class SceneObject {
    constructor(cell, ctx) {
        this.transform = new Transform();
        this.renderRect = new Transform();
        this.visible = true;
        this.children = [];
        this.parent = null;

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
        sceneObject.parent = this;
    }

    removeChild(sceneObject) {
        const index = this.children.indexOf(sceneObject);
        if (index !== -1) {
            this.children.splice(index, 1);
            sceneObject.parent = null;
        }
    }

    getWorldPosition() {
        if (this.parent) {
            const parentPos = this.parent.getWorldPosition();
            return {
                x: this.transform.position.x + parentPos.x,
                y: this.transform.position.y + parentPos.y
            };
        } else {
            return { ...this.transform.position };
        }
    }

    draw() {
        if (!this.visible || !this.image.complete) return;

        const pos = this.getWorldPosition();

        this.ctx.drawImage(
            this.image,
            this.renderRect.position.x,
            this.renderRect.position.y,
            this.renderRect.size.x,
            this.renderRect.size.y,
            Math.floor(pos.x),
            Math.floor(pos.y),
            this.transform.size.x,
            this.transform.size.y
        );

        // draw children if needed
        for (const child of this.children) {
            child.draw();
        }
    }
}
