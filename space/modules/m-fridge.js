import { Module } from "./module.js";

export class MFridge extends Module {
    constructor(cell) {
        super(cell, "fridge");
        this.flags.add("food");
        this.SetSize(16, 16);
    }

    _on_tick(subscriber) {
        subscriber.stomach += 0.1;
        Math.round(subscriber.stomach);
        
        console.log(`stomach volume: ${subscriber.stomach}`);

        if (subscriber.stomach >= 1) {
            this.unsubscribe(subscriber);
        }
    }
}