import { Game } from './game.js';

const game = new Game();
await game.load('./mapdata/station');     // load assets
game.start();          // render initial state
