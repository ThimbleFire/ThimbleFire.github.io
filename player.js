import { Character } from './character.js';

export class Player extends Character {
    constructor(name, x, y, ctx, input) {
        super(name, x, y, ctx)
        this.input = input
        this.x = x
        this.y = y
    }

    update(delta) {
        const movement = this.input.movementVector;

        this.x += movement.x * delta * 0.1;
        this.y += movement.y * delta * 0.1;
    }
}
