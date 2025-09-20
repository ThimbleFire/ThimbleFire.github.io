import { Transform } from "../transform.js";

export class Module extends Transform {
    constructor(cell, type) {
        super();
        this.cell = cell;
        this.SetPosition(cell.x * 16, cell.y * 16);
        this.subscribers = new Set();
        this.type = type;
        this.flags = new Set();
    }

    subscribe(npc) {
        this.subscribers.add(npc);
        console.log(`${npc.name} is now interacting with ${this.type}`);
    }

    unsubscribe(npc) {
        this.subscribers.delete(npc);
    }

    async interact(npc) {
        await new Promise(res => setTimeout(res, 2000));
    }

    tick() {
        this.subscribers.forEach(x=>this._on_tick(x));
    }

    // override me
    _on_tick(subscriber) {

    }
}