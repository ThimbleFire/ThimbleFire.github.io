import { MSink }    from './modules/m-sink.js'
import { MFridge }  from './modules/m-fridge.js';
import { MToilet }  from './modules/m-toilet.js';
import { NodePF }   from './pathfinding.js';

export class TileMap {
    constructor(ctx, pathfinding) {
        this.ctx = ctx;
        this.pathfinding = pathfinding;
        this.image = new Image();
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
    }

    async load_map(url, modules) {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        const map = xml.querySelector("map");
        this.tileSize = parseInt(map.getAttribute("tilewidth"));
        this.columns = parseInt(map.getAttribute("width"));
        this.rows = parseInt(map.getAttribute("height"));
        
        // clear existing modules
        modules.length = 0;

        this.layers = [];
        xml.querySelectorAll("layer").forEach(layer => {
            const data = layer.querySelector("data").textContent.trim();
            const name = layer.getAttribute("name");
            const grid = data.split(",").map(n => parseInt(n));
            this.layers.push(grid);

            if (name === "Blocked") {
                this.pathfinding.width = this.columns;
                this.pathfinding.height = this.rows;
                this.pathfinding.nodes = [];
                this.pathfinding.nodes = Array.from({ length: this.rows }, (_, y) =>
                    Array.from({ length: this.columns }, (_, x) => {
                        const tileId = grid[y * this.columns + x];
                        const walkable = tileId === 0;
                        const cell = { x, y };

                        // Populate modules if tile ID corresponds to a module
                        const mod = this.getModuleType(tileId, cell);
                        if (mod) { 
                            modules.push(mod);
                        }
                        return new NodePF(cell, walkable);
                    })
                );
            }
        });
    }

    getModuleType(id, cell) {
        const moduleMap = {
            19: MSink,
            39: MFridge,
            21: MToilet,
        };
        const ModuleClass = moduleMap[id];
        return ModuleClass ? new ModuleClass(cell) : null;
    }

    draw() {
        this.layers.forEach(layer => {
            layer.forEach((tile, i) => {
                if (tile === 0) return; // 0 = empty
                const x = (i % this.columns) * this.tileSize;
                const y = Math.floor(i / this.columns) * this.tileSize;
                this.drawTile(tile - 1, x, y);
            });
        });
    }

    drawTile(index, x, y) {
        const tilesPerRow = this.image.width / this.tileSize;
        const tileX = (index % tilesPerRow) * this.tileSize;
        const tileY = Math.floor(index / tilesPerRow) * this.tileSize;

        this.ctx.drawImage(
            this.image,
            tileX, tileY,
            this.tileSize, this.tileSize,
            x, y,
            this.tileSize, this.tileSize
        );
    }
}
