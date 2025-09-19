import { Character } from './character.js';

// Just a demonstration class to pass into Character
class FireTrait {
    describe() {
        return "Fire Affinity";
    }
}

class IceTrait {
    describe() {
        return "Ice Affinity";
    }
}

export class Game {
    constructor() {
        this.characters = [];  // list of Character instances
    }

    createCharacters() {
        const fireTrait = new FireTrait();
        const iceTrait = new IceTrait();

        // Create characters and assign different traits
        const char1 = new Character("Blaze", fireTrait);
        const char2 = new Character("Frost", iceTrait);

        // Add them to the game
        this.characters.push(char1, char2);
    }

    run() {
        console.log("Game started. Characters:");
        this.characters.forEach(character => character.describe());
    }
}
