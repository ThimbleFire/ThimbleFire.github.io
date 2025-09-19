import { Pathfinding } from './pathfinding.js';
import { SceneObject }   from './sceneobject.js';

export class Character extends SceneObject {
    constructor(name, cell, ctx, pathfinding) {
        super();
        this.transform.SetPosition(cell.x * 16, cell.y * 16);
        this.transform.SetSize(16, 16);
        this.name = name;
        this.cell = cell;
        this.ctx = ctx;
        this.pathfinding = pathfinding;

        this.image = new Image();
        this.frameWidth = 16;
        this.frameHeight = 16;
        this.currentAnimation = 'walkDown';
        this.frameIndex = 0;
        this.frameTime = 0.0;        
        this.frameDuration = 600; // milliseconds per frame

        this.chain = [];


        this.velocity = { x: 0, y: 0 };
        this.lastVelocity = { x: 0, y: 0 };

        this.animations = {
            walkDown: [
                { x: 0, y: 0 },
                { x: 16, y: 0 },
                { x: 32, y: 0 },
                { x: 16, y: 0 }
            ],
            walkUp: [
                { x: 48, y: 0 },
                { x: 64, y: 0 },
                { x: 80, y: 0 },
                { x: 64, y: 0 }
            ],
            walkLeft: [
                { x: 96, y: 0 },
                { x: 112, y: 0 }
            ],
            walkRight: [
                { x: 128, y: 0 },
                { x: 144, y: 0 }
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
        this.update_animation(delta);
        this.velocity = { x: 0, y: 0 };

        if (this.chain.length === 0) {
            // Flatten 2D nodes array
            const allNodes = this.pathfinding.nodes.flat();
            const walkables = allNodes.filter(n => n.walkable);

            if (walkables.length > 0) {
                const target = walkables[Math.floor(Math.random() * walkables.length)];
                const path = this.pathfinding.buildPath(this.cell, target.cell, 0);
                if (path.length > 0) {
                    this.chain = path.slice();
                }
            }
        }
        else {
            const remainingDistance = this.transform.MoveToward(this.chain[0].position, delta, 60.0);

            if (remainingDistance <= 4) {
                this.cell = { x: this.chain[0].cell.x, y: this.chain[0].cell.y };
                this.chain.shift();
            }
        }
    }


    update_animation(delta) {
        if(this.velocity != this.lastVelocity)
        {
            this.lastVelocity = this.velocity;
            if (this.velocity.y == 1) {
                this.setAnimation("walkDown");
            }
            if (this.velocity.y == -1) {
                this.setAnimation("walkUp");
            }
            if (this.velocity.x == -1) {
                this.setAnimation("walkLeft");
            }
            if (this.velocity.x == 1) {
                this.setAnimation("walkRight");
            }
        }

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
            this.transform.position.x, this.transform.position.y,             // Destination x/y
            this.frameWidth, this.frameHeight
        );
    }
}
