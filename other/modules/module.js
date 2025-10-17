import { Transform } from "../transform.js";

export class Module extends Transform {
    constructor(cell, type) {
        super();
        this.cell = cell;
        this.type = type;
        this.SetPosition(cell.x * 16, cell.y * 16);
        this.subscribers = new Set();
        this.flags = new Set();
    }

    subscribe(character) {
        if (this.subscribers.has(character))
            return;

        this.subscribers.add(character);
        console.log(`${character.name} is now interacting with ${this.type}`);
    }

    unsubscribe(character) {
        this.subscribers.delete(character);
        console.log(`${character.name} has unsubscribed from ${this.type}`);
    }

    tick() {
        this.subscribers.forEach(x=>this._on_tick(x));
    }

    // override me
    _on_tick(subscriber) {
        
    }
}