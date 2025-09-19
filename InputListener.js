export class Input {
    constructor() {
        this.keys = {};
        this.movementVector = { x: 0, y: 0 };

        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            //if( this.keys[key] == false) {
                this.keys[key] = true;
                this.updateMovementVector();
                console.log(`keydown: ${e.key}`);
            //}
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            //if (this.keys[key] === true) {
                this.keys[key] = false;
                this.updateMovementVector();
                console.log(`keyup: ${e.key}`);
            //}
        });
    }

    updateMovementVector() {
        const x = (this.keys['d'] ? 1 : 0) + (this.keys['a'] ? -1 : 0);
        const y = (this.keys['s'] ? 1 : 0) + (this.keys['w'] ? -1 : 0);
        this.movementVector = { x, y };
    }
}
