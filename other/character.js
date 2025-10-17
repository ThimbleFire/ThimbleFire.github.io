import { Pathfinding } from './pathfinding.js';
import { AnimatedSceneObject }   from './sceneobject-animated.js';

export class Character extends AnimatedSceneObject {
    constructor(name, cell, ctx, pathfinding) {
        super(cell, ctx, 'walkDown', 150);
        this.name = name;
        this.transform.SetPosition(cell.x * 16, cell.y * 16);
        this.transform.SetSize(16, 16);
        this.renderRect.SetSize(16, 16);
        this.renderRect.SetPosition(16, 0);

        this.pathfinding = pathfinding;

        this.movement_speed = 40;
        this.moving = false;
        this.chain = [];
        this.direction = { x: 0, y: 0 };
        this.lastDirection = { x: 0, y: 0 };

        this.bladder = 0.5;
        this.stomach = 0.25;
        this.thirst = 0.315;

        const animations = {
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
        super.setAnimationData(animations);
    }
    
    update(delta) {
        if (this.chain.length === 0) {
            this._on_destination_reached();
            //this.direction = { x: 0, y: 0 };
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
        super.update(delta);
        this.updateAnimation(delta);
        //this.direction = { x: 0, y: 0 };
    }

    _on_tile_changed() {
        
    }

    _on_destination_reached() {
        
    }

    updateAnimation(delta) {
        
        // Pick facing direction (stick to lastDirection if standing still)
        let facing = (this.direction.x !== 0 || this.direction.y !== 0) 
            ? this.direction 
            : this.lastDirection;

        // Only change animation if something meaningful changed
        const newAnim = (this.moving ? "walk" : "idle") + 
            (facing.y ===  1 ? "Down"   : 
             facing.y === -1 ? "Up"     : 
             facing.x ===  1 ? "Right"  : 
             facing.x === -1 ? "Left"   : "Down");

        if (newAnim !== this.currentAnimation) {
            this.setAnimation(newAnim);
        }

        // Remember last non-zero direction
        if (this.direction.x !== 0 || this.direction.y !== 0) {
            this.lastDirection = this.direction;
        }
    }
}
