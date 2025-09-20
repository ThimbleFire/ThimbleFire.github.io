export class Input {
    constructor() {
        this.keys = {};
        this.movementVector = { x: 0, y: 0 };
        this.listeners = {}; // map of key -> array of callbacks

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    onKey(key, type, callback) {
        const id = `${key.toLowerCase()}-${type}`;
        if (!this.listeners[id]) this.listeners[id] = [];
        this.listeners[id].push(callback);
    }

    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        this.keys[key] = true;
        this.updateMovementVector();
        this.emit(key, "down");
    }

    handleKeyUp(e) {
        const key = e.key.toLowerCase();
        this.keys[key] = false;
        this.updateMovementVector();
        this.emit(key, "up");
    }

    emit(key, type) {
        const id = `${key}-${type}`;
        if (this.listeners[id]) {
            this.listeners[id].forEach(cb => cb());
        }
    }

    updateMovementVector() {
        const x = (this.keys['d'] ? 1 : 0) + (this.keys['a'] ? -1 : 0);
        const y = (this.keys['s'] ? 1 : 0) + (this.keys['w'] ? -1 : 0);
        this.movementVector = { x, y };
    }
}
