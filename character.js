export class Character {
    constructor(name, x, y, ctx) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.image = new Image();
        this.frameWidth = 64;
        this.frameHeight = 64;
        this.columns = 4;
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
    }

    drawFrame(frameIndex) {
        const sx = (frameIndex % this.columns) * this.frameWidth;
        const sy = Math.floor(frameIndex / this.columns) * this.frameHeight;

        this.ctx.drawImage(
            this.image,
            sx, sy,
            this.frameWidth, this.frameHeight,
            this.x, this.y,
            this.frameWidth, this.frameHeight
        );
    }
}
