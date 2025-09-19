import { Character } from './character.js';
import { TileMap } from './tilemap.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.tilemap.drawTile(5, 100, 100);  // draw tile #5
        this.characters.forEach(character => character.drawFrame(2));  // draw frame #2
    }
}
