export class Input {
    constructor() {
        this.keys = {};
        this.movementVector = { x: 0, y: 0 };

        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.updateMovementVector();
            console.log(`keydown: ${e.key}`);
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.updateMovementVector();
            console.log(`keyup: ${e.key}`);
        });
    }

    updateMovementVector() {
        const x = (this.keys['d'] ? 1 : 0) + (this.keys['a'] ? -1 : 0);
        const y = (this.keys['w'] ? 1 : 0) + (this.keys['s'] ? -1 : 0);
        this.movementVector = { x, y };
    }
}
