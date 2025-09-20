import { Module } from "./module.js";

export class MSink extends Module {
    constructor() {
        super(clearInterval, "sink");
        this.flags.add("water_source");
        this.SetSize(16, 16);
    }

    _on_tick(subscriber) {

    }
}