export class Camera {
    constructor(viewWidth, viewHeight) {
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.position = { x: 0, y: 0 };
    }

    follow(target) {
        // target should have a `transform` or `position`
        this.position.x = target.position.x - this.viewWidth / 2;
        this.position.y = target.position.y - this.viewHeight / 2;
    }

    apply(ctx) {
        ctx.translate(-this.position.x, -this.position.y);
    }

    reset(ctx) {
        ctx.translate(this.position.x, this.position.y);
    }
}
