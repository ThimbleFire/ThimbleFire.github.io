import { Character } from './character.js';

export class Player extends Character {
    constructor(name, cell, ctx, input, pathfinding) {
        super(name, cell, ctx, pathfinding)
        this.input = input
    }

    update(delta) {
        if (this.moving == false) {
            this.direction = this.input.movementVector;
            this.moving = false;
            if (this.direction.x !== 0 || this.direction.y !== 0) {
                const target = this.pathfinding.getNode({
                    x: this.cell.x + this.direction.x,
                    y: this.cell.y + this.direction.y
                });
                
                if (target && target.walkable) {
                    const path = this.pathfinding.buildPath(this.cell, target.cell, 2);
                    if (path.length > 0) {
                        this.moving = true;
                        this.chain = path.slice();
                    }
                }
            }
        }

        super.update(delta);
    }

    tryInteract() {
        console.log(`hello world`);
    }

    _on_tile_changed() {
        this.cell = this.chain[0].cell;
        this.transform.position = this.chain[0].position;
        this.chain.shift();
    }

    _on_destination_reached() {
        this.moving = false;
    }
}
