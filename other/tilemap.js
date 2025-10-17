import { NodePF }   from './pathfinding.js';

export class TileMap {
    constructor(ctx, pathfinding) {
        this.ctx = ctx;
        this.pathfinding = pathfinding;
    }

    async load_map(x, y) {
        // generate terrain
    }

    draw() {
        this.layers.forEach(layer => {
            layer.forEach((tileId, i) => {
                if (tileId === 0) return; // 0 = empty
                const x = (i % this.columns) * this.tileSize;
                const y = Math.floor(i / this.columns) * this.tileSize;
                this.drawTile(tileId, x, y);
            });
        });
    }

    drawTile(tileId, x, y) {
        const colors = {
            1:  '#33AA33', // grass
            2:  '#885522', // dirt
            3:  '#3366AA', // water
            4:  '#888888', // stone
            5:  '#DDCC88', // sand
            6:  '#AA7733', // wood
            7:  '#CC3300', // lava
            8:  '#99DDFF', // ice
        };

        this.ctx.fillStyle = colors[tileId] || '#444'; // fallback color
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }
}
