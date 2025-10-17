import { Game } from './game.js';

const game = new Game();
await game.load();     // load assets
game.start();          // render initial state
