import { Character } from './character.js';

export class Player extends Character {
    constructor(name, x, y, ctx, input) {
        super(name, x, y, ctx)
        this.input = input
    }

    update(delta) {
        const movement = this.input.movementVector;
        
        this.x += movement.x * delta * 1.6;
        this.y += movement.y * delta * 1.6;
    }
}
