import { NPC } from './npc.js';
import { TileMap } from './tilemap.js';
import { Input } from './input-listener.js';
import { Player } from './player.js';
import { Pathfinding } from './pathfinding.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.lastTimestamp = performance.now();
        
        this.pathfinding = new Pathfinding();
        this.modules = [];
        this.tilemap = new TileMap(this.ctx, this.pathfinding);
        this.characters = [
            new NPC("Blaze", {x:5, y:6}, this.ctx, this.pathfinding),
            new NPC("Frost", {x:6, y:7}, this.ctx, this.pathfinding)
        ];
        this.input = new Input();
        this.player = new Player("Tony", {x:6, y:5}, this.ctx, this.input, this.pathfinding);
        this.input.onKey("e", "down", () => {
            // get the cell 1 tile infront of the player character
            const cellInFrontOfPlayer = { x: this.player.cell.x + this.player.lastDirection.x, y: this.player.cell.y + this.player.lastDirection.y};
            // search for modules in that tile
            for (const module of this.modules) {
                if (module.cell.x == cellInFrontOfPlayer.x && module.cell.y == cellInFrontOfPlayer.y) {
                    module.subscribe(this.player);
                }
            }
        });
    
        // module update timer
        this.mut_time = 0.0;
        this.mut_interval = 600; //ms
    }

    async load() {
        await Promise.all([
            this.tilemap.load('./tilemap.png'),
            this.tilemap.load_map('./map.tmx', this.modules),
            this.player.load('./character.png'),
            ...this.characters.map(c => c.load('./character.png')),
        ]);
    }

    tryInteract() {
        console.log(`hello world`);
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
        // module update timer
        this.mut_time += delta;
        if (this.mut_time >= this.mut_interval) {
            this.mut_time -= this.mut_interval;
            for (const module of this.modules) {
                module.tick();
            }
        }

        // update entities
        for (const character of this.characters) {
            character.update(delta); // animation, movement, etc.
        }
        this.player.update(delta);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.tilemap.draw();

        for (const character of this.characters) {
            character.draw();
        }
        this.player.draw();
    }
}
