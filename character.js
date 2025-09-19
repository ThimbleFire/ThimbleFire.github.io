export class Character {
    constructor(name, x, y, ctx) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.image = new Image();
        this.frameWidth = 16;
        this.frameHeight = 16;
        this.currentAnimation = 'idleDown';
        this.frameIndex = 0;
        this.frameTime = 0.0;        
        this.frameDuration = 600; // milliseconds per frame

        this.animations = {
            walkDown: [
                { x: 0, y: 0 },
                { x: 16, y: 0 },
                { x: 32, y: 0 },
                { x: 16, y: 0 }
            ],
            walkRight: [
                { x: 48, y: 0 },
                { x: 64, y: 0 },
                { x: 80, y: 0 },
                { x: 64, y: 0 }
            ],
            walkLeft: [
                { x: 144, y: 0 },
                { x: 160, y: 0 },
                { x: 176, y: 0 },
                { x: 160, y: 0 }
            ],
            walkUp: [
                { x: 192, y: 0 },
                { x: 208, y: 0 },
                { x: 224, y: 0 },
                { x: 208, y: 0 }
            ],
            idleDown: [ { x: 16, y: 0 } ],
            idleRight: [ { x: 64, y: 0 } ],
            idleLeft: [ { x: 112, y: 0 } ],
            idleUp: [ { x: 160, y: 0 } ]
        };
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
    }

    setAnimation(name) {
        if (this.currentAnimation !== name) {
            this.currentAnimation = name;
            this.frameIndex = 0;
            this.frameTime = 0;
        }
    }
    
    update(delta) {
        // Cycle animation frames based on time
        this.frameTime += delta;
        const frames = this.animations[this.currentAnimation];
        
        if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.frameIndex = (this.frameIndex + 1) % frames.length;
        }
    }

    draw() {
        const frames = this.animations[this.currentAnimation];
        const frame = frames[this.frameIndex];
    
        this.ctx.drawImage(
            this.image,
            frame.x, frame.y,           // Source x/y
            this.frameWidth, this.frameHeight,
            this.x, this.y,             // Destination x/y
            this.frameWidth, this.frameHeight
        );
    }
}
