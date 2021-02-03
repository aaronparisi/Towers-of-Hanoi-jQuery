import { GameView } from './views/gameView.js';
import { Game } from './gameLogic/game.js';

$(() => {
  // Your code here
  let myGame = new Game();
  new GameView(myGame);
});
