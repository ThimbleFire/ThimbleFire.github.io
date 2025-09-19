export class Character {
    constructor(name, trait) {
        this.name = name;
        this.hp = 100;
        this.trait = trait;  // this can be any object/class
    }

    describe() {
        console.log(`${this.name} has trait: ${this.trait.describe?.() || this.trait}`);
    }
}
