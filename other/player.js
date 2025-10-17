import { Character } from './character.js';

export class Player extends Character {

    invokable = 0;

    constructor(name, cell, ctx, input, pathfinding, func) {
        super(name, cell, ctx, pathfinding)
        this.input = input
        this.invokable = func;
    }

    setTransitionZones(triggers) {
        this.transitionZones = triggers;
    }

    update(delta) {
        if (this.moving == false) {
            this.direction = this.input.movementVector;
            if (this.direction.x !== 0 || this.direction.y !== 0) 
            {
                const target = this.pathfinding.getNode({
                    x: this.cell.x + this.direction.x,
                    y: this.cell.y + this.direction.y
                });
                
                console.log('attempting to move to:', {
                    x: this.cell.x + this.direction.x,
                    y: this.cell.y + this.direction.y
                });
                
                console.log('target node:', target);
                console.log('target walkable:', target?.walkable);

                if (target && target.walkable)
                {
                    const path = this.pathfinding.buildPath(this.cell, target.cell, 2);
                    console.log(`path returned length > 0: ${path.length > 0 ? 'true' : 'false'}`);
                    
                    if (path.length > 0)
                    {
                        this.moving = true;
                        this.chain = path.slice();
                    }
                }
            }
        }

        super.update(delta);
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
