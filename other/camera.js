import { SceneObject } from './sceneobject.js';

export class Camera extends SceneObject {
    constructor(viewWidth, viewHeight, ctx) {
        super({ x: 0, y: 0 }, ctx);

        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;

        // The camera itself doesn’t need to render an image
        this.visible = false;
    }

    follow(target) {
        this.transform.position.x = target.transform.position.x - this.viewWidth / 2;
        this.transform.position.y = target.transform.position.y - this.viewHeight / 2;
    }

    apply(ctx) {
        ctx.translate(
            -this.transform.position.x,
            -this.transform.position.y
        );
    }

    reset(ctx) {
        ctx.translate(
            this.transform.position.x,
            this.transform.position.y
        );
    }
}
