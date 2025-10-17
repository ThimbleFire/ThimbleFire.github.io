import { NPC } from './npc.js';
import { TileMap } from './tilemap.js';
import { Input } from './input-listener.js';
import { Player } from './player.js';
import { Pathfinding } from './pathfinding.js';
import { Camera } from './camera.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.lastTimestamp = performance.now();
        this.npcs = [];
        this.camera = new Camera(this.canvas.width, this.canvas.height);        
        this.pathfinding = new Pathfinding();
        this.tilemap = new TileMap(this.ctx, this.pathfinding);
        this.input = new Input();
        this.player = new Player("Tony", {x:0, y:0}, this.ctx, this.input, this.pathfinding, (filename) => { this.load(filename); });
        this.input.onKey("e", "down", async () => {
            // get the cell 1 tile infront of the player character
            const cellInFrontOfPlayer = { 
                x: this.player.cell.x + this.player.lastDirection.x, 
                y: this.player.cell.y + this.player.lastDirection.y
            };
            // search for modules in that tile
            // for (const module of this.modules) {
            //     if (module.cell.x == cellInFrontOfPlayer.x && module.cell.y == cellInFrontOfPlayer.y) {
            //         module.subscribe(this.player);
            //         return
            //     }
            // }
        });
    
        // module update timer
        this.mut_time = 0.0;
        this.mut_interval = 600; //ms
    }

    async load() {
        this.npcs = [];
        this.player.cell = { x: 16, y: 16 };
        this.player.transform.SetPosition(this.player.cell.x * 16, this.player.cell.y * 16);
        await Promise.all([
            this.tilemap.load_map(this.player.cell.x, this.player.cell.y),
            this.player.load('./character.png'),
            ...this.npcs.map(c => c.load('./character.png')),
        ]);
        this.pathfinding.enabled = true;
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
        // update entities
        for (const npc of this.npcs) {
            npc.update(delta); // animation, movement, etc.
        }
        this.player.update(delta);
        
        this.camera.follow(this.player);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        
        this.camera.apply(this.ctx);
        
        this.tilemap.draw();

        for (const npcs of this.npcs) {
            npcs.draw();
        }
        this.player.draw();

        this.ctx.restore();
    }
}
