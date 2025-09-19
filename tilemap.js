export class TileMap {
    constructor(ctx) {
        this.ctx = ctx;
        this.image = new Image();
        this.tileSize = 8;
        this.columns = 32;
    }

    async load(src) {
        return new Promise(resolve => {
            this.image.onload = resolve;
            this.image.src = src;
        });
    }

    drawTile(index, x, y) {
        const tileX = (index % this.columns) * this.tileSize;
        const tileY = Math.floor(index / this.columns) * this.tileSize;

        this.ctx.drawImage(
            this.image,
            tileX, tileY,
            this.tileSize, this.tileSize,
            x, y,
            this.tileSize, this.tileSize
        );
    }
}
