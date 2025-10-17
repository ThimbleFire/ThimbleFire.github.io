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
    
        const distance = Math.hypot(dir.x, dir.y);
    
        if (distance === 0) return 0; // Already at target
    
        const step = (delta / 1000) * speed;
    
        // Prevent overshooting the target
        const moveDist = Math.min(step, distance);
        const moveX = (dir.x / distance) * moveDist;
        const moveY = (dir.y / distance) * moveDist;
    
        this.Translate(moveX, moveY);
    
        return distance - moveDist;
    }

    ToString() {
        console.log(`transform: { position: (x: ${this.position.x} y: ${this.position.y}), size: (width: ${this.size.x} height: ${this.size.y}) }`);
    }
}
