import { Module } from "./module.js";

export class MToilet extends Module {
    constructor(cell) {
        super(cell, "toilet");
        this.flags.add("bladder");
        this.SetSize(16, 16);
    }

    _on_tick(subscriber) {
        subscriber.bladder -= 0.1;
        Math.round(subscriber.bladder);
        
        console.log(`bladder volume: ${subscriber.bladder}`);

        if (subscriber.bladder <= 0) {
            this.unsubscribe(subscriber);
        }
    }
}