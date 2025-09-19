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
        this.frameDuration = 150; // milliseconds per frame
        this.movement_speed = 40;
        this.moving = false;

        this.chain = [];


        this.direction = { x: 0, y: 0 };
        this.lastDirection = { x: 0, y: 0 };

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
            idleRight: [ { x: 128, y: 0 } ],
            idleLeft: [ { x: 96, y: 0 } ],
            idleUp: [ { x: 64, y: 0 } ]
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
        this.direction = { x: 0, y: 0 };
        if (this.chain.length === 0) {
            this._on_destination_reached();
        }
        else
        {
            this.remainingDistance = this.transform.MoveToward(this.chain[0].position, delta, this.movement_speed);
                
            this.direction = { 
                x: this.chain[0].cell.x - this.cell.x, 
                y: this.chain[0].cell.y - this.cell.y
            };
        
            if (this.remainingDistance <= .64) {
                this._on_tile_changed();
            }
        }
    }

    _on_tile_changed() {
        
    }

    _on_destination_reached() {
        
    }

    update_animation(delta) {
        if(this.direction != this.lastDirection)
        {
            this.lastDirection = this.direction;
            if (this.direction.y == 1) {
                this.setAnimation(this.moving ? "walkDown" : "idleDown");
            }
            if (this.direction.y == -1) {
                this.setAnimation(this.moving ? "walkUp" : "idleUp");
            }
            if (this.direction.x == -1) {
                this.setAnimation(this.moving ? "walkLeft" : "idleLeft");
            }
            if (this.direction.x == 1) {
                this.setAnimation(this.moving ? "walkRight" : "idleRight");
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
