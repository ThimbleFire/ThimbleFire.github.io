import { Character } from "./character.js";

export class NPC extends Character {
    constructor(name, cell, ctx, pathfinding) {
        super(name, cell, ctx, pathfinding);
    }

    _on_tile_changed() {
        this.cell = this.chain[0].cell;
        this.transform.position = this.chain[0].position;
        this.chain.shift();
    }

    _on_destination_reached() {
        const allNodes = this.pathfinding.nodes.flat();
        const walkables = allNodes.filter(n => n.walkable);
        this.moving = false;

        if (walkables.length > 0) {
            const target = walkables[Math.floor(Math.random() * walkables.length)];
            const path = this.pathfinding.buildPath(this.cell, target.cell, 2);
            if (path.length > 0) {
                this.moving = true;
                this.chain = path.slice();
            }
        }
    }
}