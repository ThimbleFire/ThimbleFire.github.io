import { SceneObject } from './sceneobject.js';

export class AnimatedSceneObject extends SceneObject {
    constructor(cell, ctx, initialAnimation, frameDuration) {
        super(cell, ctx);
        this.currentAnimation = initialAnimation;
        this.frameIndex = 0;
        this.frameTime = 0.0;
        this.frameDuration = frameDuration; // milliseconds per frame
    }

    setAnimationData(animations) {
        this.animations = animations;
    }

    setAnimation(name) {
        if (this.currentAnimation !== name) {
            this.currentAnimation = name;
            this.frameIndex = 0;
            this.frameTime = 0;
        }
    }

    update(delta) {
        // Advance frames
        this.frameTime += delta;
        const frames = this.animations[this.currentAnimation];
        if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.frameIndex = (this.frameIndex + 1) % frames.length;
        }
    }

    draw() {
        if (!this.visible || !this.image.complete) return;

        const frames = this.animations[this.currentAnimation];
        const frame = frames[this.frameIndex];

        const pos = this.getWorldPosition();

        this.ctx.drawImage(
            this.image,
            frame.x,
            frame.y,
            this.renderRect.size.x,
            this.renderRect.size.y,
            Math.floor(pos.x),
            Math.floor(pos.y),
            this.transform.size.x,
            this.transform.size.y
        );

        // Optionally draw children (if any)
        for (const child of this.children) {
            child.draw();
        }
    }
}
