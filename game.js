import { Character } from './character.js';
import { TileMap } from './tilemap.js';
import { Input } from './InputListener.js';
import { Player } from './player.js';
import { Pathfinding } from './pathfinding.js';
import { NodePF } from './pathfinding.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.lastTimestamp = performance.now();
        
        this.pathfinding = new Pathfinding();
        this.tilemap = new TileMap(this.ctx, this.pathfinding);
        this.characters = [
            new Character("Blaze", {x:5, y:7}, this.ctx, this.pathfinding),
            //new Character("Frost", {x:4, y:7}, this.ctx, this.pathfinding)
        ];
        this.input = new Input();
        //this.player = new Player("Tony", {x:6, y:8}, this.ctx, this.input, this.pathfinding);
    }

    async load() {
        await Promise.all([
            this.tilemap.load('./tilemap.png'),
            this.tilemap.load_map('./map.tmx'),
            //this.player.load('./character.png'),
            ...this.characters.map(c => c.load('./character.png')),
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
            character.update(delta); // animation, movement, etc.
        }
        //this.player.update(delta);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.tilemap.draw();

        for (const character of this.characters) {
            character.draw();
        }
        //this.player.draw();
    }
}
