import { Module } from "./module.js";

export class MSink extends Module {
    constructor(cell) {
        super(cell, "sink");
        this.flags.add("water_source");
        this.SetSize(16, 16);
    }

    _on_tick(subscriber) {
        subscriber.thirst += 0.1;
        Math.round(subscriber.thirst);

        console.log(`hydration volume: ${subscriber.thirst}`);

        if (subscriber.thirst >= 1) {
            subscriber.thirst = 1
            this.unsubscribe(subscriber);
        }
    }
}