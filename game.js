import { Character } from './character.js';
import { TileMap } from './tilemap.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.lastTimestamp = performance.now();
        
        this.tilemap = new TileMap(this.ctx);
        this.characters = [
            new Character("Blaze", 200, 100, this.ctx),
            new Character("Frost", 300, 100, this.ctx)
        ];
    }

    async load() {
        await Promise.all([
            this.tilemap.load('./tilemap.png'),
            ...this.characters.map(c => c.load('./character.png'))
        ]);
    }

    start() {
        requestAnimationFrame(this.loop.bind(this)); // Start game loop
    }

    loop(timestamp) {
        const delta = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        this.update(delta);
        this.render();

        requestAnimationFrame(this.loop.bind(this)); // Continue loop
    }

    update(delta) {
        for (const character of this.characters) {
            console.log(`calling character.update`);
            character.update(delta); // animation, movement, etc.
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.tilemap.drawTile(5, 100, 100);

        for (const character of this.characters) {
            character.draw();
        }
    }
}
