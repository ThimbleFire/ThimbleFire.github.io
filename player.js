import { Character } from './character.js';

export class Player extends Character {
    constructor(name, cell, ctx, input, pathfinding) {
        super(name, cell, ctx, pathfinding)
        this.input = input
    }

    update(delta) {

        this.velocity = this.input.movementVector;
        super.update(delta);
    }
}
