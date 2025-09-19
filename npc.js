import { Character } from "./character.js";

export class NPC extends Character {
    constructor(name, cell, ctx, pathfinding) {
        super(name, cell, ctx, pathfinding);
    }

    update(delta) {
        super.update(delta);
    }
}