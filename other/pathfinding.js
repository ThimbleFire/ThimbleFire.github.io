export class NodePF {
    constructor(cell, walkable = true) {
        this.cell = cell;
        this.position = { x: cell.x * 16, y: cell.y * 16 };
        this.walkable = walkable;

        this.parent = null;
        this.GCost = Infinity;
        this.HCost = 0;
    }

    get FCost() {
        return this.GCost + this.HCost;
    }
}

export class Pathfinding {
    constructor() {
        this.nodes = [];
        this.width = 0;
        this.height = 0;
        this.enabled = true;
    }

    getNode(cell) {
        if ( cell.x < 0 || cell.y < 0 )
            return null;
        return this.nodes[cell.y][cell.x];
    }

    setTileUnoccupied(cell) {
        let node = this.getNode(cell);
        if (node) node.walkable = true;
    }

    setTileOccupied(cell) {
        let node = this.getNode(cell);
        if (node) node.walkable = false;
    }

    getNeighbors(node, mode) {
        let neighbors = [];
        let directions = [];

        if (mode === 0 || mode === 2) {
            directions.push(
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            );
        }
        if (mode === 0 || mode === 1) {
            directions.push(
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: -1, y: 1 },
                { x: 1, y: -1 }
            );
        }

        for (let d of directions) {
            let neighbor = this.getNode({ 
                x: node.cell.x + d.x, 
                y: node.cell.y + d.y 
            });
            if (neighbor && neighbor.walkable) {
                neighbors.push(neighbor);
            }
        }
        return neighbors;
    }

    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    reconstructPath(goalNode) {
        let path = [];
        let current = goalNode;
        while (current.parent) {
            path.push(current);
            current = current.parent;
        }
        return path.reverse();
    }

    buildPath(start, goal, mode) {
        // this prevents npcs from calculating paths before the pathfinder has been given a new grid
        if (this.enabled == false) {
            return [];
        }
        // Reset nodes
        for (let row of this.nodes) {
            for (let node of row) {
                node.GCost = Infinity;
                node.HCost = 0;
                node.parent = null;
            }
        }

        let openSet = new Set();
        let closedSet = new Set();

        let startNode = this.getNode(start);
        if (!startNode) return [];

        let goalNode = this.getNode(goal);
        if (!goalNode || !goalNode.walkable) {
            let altNeighbors = this.getNeighbors(this.getNode(goal), mode);
            altNeighbors.sort((a, b) => {
                let da = Math.hypot(start.x - a.cell.x, start.y - a.cell.y);
                let db = Math.hypot(start.x - b.cell.x, start.y - b.cell.y);
                return da - db;
            });
            goalNode = altNeighbors.find(n => n.walkable) || null;
        }

        if (!goalNode) return [];

        startNode.GCost = 0;
        startNode.HCost = this.heuristic(start, goal);
        openSet.add(startNode);

        while (openSet.size > 0) {
            let currentNode = null;
            let lowestFCost = Infinity;

            for (let node of openSet) {
                if (node.FCost < lowestFCost) {
                    currentNode = node;
                    lowestFCost = node.FCost;
                }
            }

            if (currentNode === goalNode) {
                return this.reconstructPath(goalNode);
            }

            openSet.delete(currentNode);
            closedSet.add(currentNode);

            for (let neighbor of this.getNeighbors(currentNode, mode)) {
                if (closedSet.has(neighbor)) continue;

                let stepCost = (neighbor.cell.x !== currentNode.cell.x && neighbor.cell.y !== currentNode.cell.y) ? Math.SQRT2 : 1;
                let tentativeG = currentNode.GCost + stepCost;

                if (!openSet.has(neighbor) || tentativeG < neighbor.GCost) {
                    neighbor.parent = currentNode;
                    neighbor.GCost = tentativeG;
                    neighbor.HCost = this.heuristic(neighbor.cell, goal);
                    openSet.add(neighbor);
                }
            }
        }

        return [];
    }
}
