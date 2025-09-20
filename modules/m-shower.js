import { Module } from "./module.js";

export class MShower extends Module {
    constructor() {
        super(clearInterval, "shower");
        this.flags.add("hygine");
        this.SetSize(16, 16);
    }

    _on_tick(subscriber) {

    }
}