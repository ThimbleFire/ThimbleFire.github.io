import { NodePF } from './pathfinding.js';
import FastNoiseLite from './FastNoiseLite.js'; // adjust path as needed

export class TileMap {
    constructor(ctx, pathfinding) {
        this.ctx = ctx;
        this.pathfinding = pathfinding;
        this.tileSize = 16;

        this.columns = 32;
        this.rows = 32;
    }

    async load_map(originX = 0, originY = 0) {
        const noise = new FastNoiseLite();
        noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
        noise.SetFrequency(0.05); // adjust for zoom
        noise.SetSeed(1337); // change for variety

        const layer = [];
        this.pathfinding.nodes = [];

        for (let y = 0; y < this.rows; y++) {
            this.pathfinding.nodes[y] = [];
            for (let x = 0; x < this.columns; x++) {
                const nx = originX + x;
                const ny = originY + y;

                const value = noise.GetNoise(nx, ny); // -1 to 1
                let tileId;

                // Map noise to tile ID
                if (value < -0.3) tileId = 3;         // water
                else if (value < 0.0) tileId = 5;     // sand
                else if (value < 0.5) tileId = 1;     // grass
                else if (value < 0.7) tileId = 2;     // dirt
                else tileId = 4;                      // stone

                layer.push(tileId);

                // Pathfinding node (walkable = not water or lava)
                const walkable = tileId !== 3 && tileId !== 7;
                const cell = { x, y };
                this.pathfinding.nodes[y][x] = new NodePF(cell, walkable);
            }
        }

        this.layers = [layer];
    }

    draw() {
        this.layers.forEach(layer => {
            layer.forEach((tileId, i) => {
                if (tileId === 0) return;
                const x = (i % this.columns) * this.tileSize;
                const y = Math.floor(i / this.columns) * this.tileSize;
                this.drawTile(tileId, x, y);
            });
        });
    }

    drawTile(tileId, x, y) {
        const colors = {
            1: '#33AA33', // grass
            2: '#885522', // dirt
            3: '#3366AA', // water
            4: '#888888', // stone
            5: '#DDCC88', // sand
            6: '#AA7733', // wood
            7: '#CC3300', // lava
            8: '#99DDFF', // ice
        };

        this.ctx.fillStyle = colors[tileId] || '#FF00FF'; // fallback: magenta = error
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }
}
