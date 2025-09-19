export class Character {
    constructor(name, x, y, ctx) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.image = new Image();
        this.frameWidth = 16;
        this.frameHeight = 16;
        this.columns = 3;

        this.frameIndex = 0;
        this.frameTime = 0;
        this.frameDuration = 600; // milliseconds per frame
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
    }
    
    update(delta) {
        // Cycle animation frames based on time
        this.frameTime += delta;
        if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.frameIndex = (this.frameIndex + 1) % this.columns;
            console.log(`${this.name} frameIndex updated to: ${this.frameIndex}`);
        }
    }

    draw() {
        const sx = (this.frameIndex % this.columns) * this.frameWidth;
        const sy = 0; // only animating first row for now
        // console.log(`Animation area: ${sx}, ${sy}, ${this.frameWidth}, ${this.frameHeight}`);

        this.ctx.drawImage(
            this.image,
            sx, sy,
            this.frameWidth, this.frameHeight,
            this.x, this.y,
            this.frameWidth, this.frameHeight
        );
    }
}
