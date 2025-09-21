export class Transform {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.size = { x: 0, y: 0 };
    }
    SetPosition(x, y) {
        this.position = { x, y };
    }
    SetSize(width, height) {
        this.size = { x:width, y:height };
    }
    Translate(x, y) {
        this.SetPosition(this.position.x + x, this.position.y + y);
    }
    MoveToward(target, delta, speed) {
        const dir = { 
            x: target.x - this.position.x, 
            y: target.y - this.position.y
        };
        //console.log(`${target.x}`);
        const distance = Math.hypot(dir.x, dir.y);

        const step = (delta / 1000) * speed;
        const moveX = (dir.x / distance) * step;
        const moveY = (dir.y / distance) * step;

        this.Translate(moveX, moveY);

        return distance;
    }
    ToString() {
        console.log(`transform: { position: (x: ${this.position.x} y: ${this.position.y}), size: (width: ${this.size.x} height: ${this.size.y}) }`);
    }
}