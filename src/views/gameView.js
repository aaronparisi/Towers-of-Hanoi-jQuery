import { bindEvents } from './viewHelpers/bindEvents.js';
import { genTowerImgDiv, genDiscContainerDiv, resetGame, setupView, updateScoreView, gameOverActions, gameIsOver } from './viewHelpers/setup.js';
import { getContainerByID, getDiscByID } from './viewHelpers/getters.js';
import { targetSelected, moveDisc, completeMove } from './viewHelpers/movers.js';
import { discIsSelected, genDiscShadow, toggleDiscSelect, toggleTargetHover, toggleValidTargets } from './viewHelpers/discSelection.js';
import { redoMove, undoMove, undoRedo, updateUndoRedoButtons } from './viewHelpers/undoRedo.js';
import { pauseDemo, startDemo, runDemo, endDemo, runAILoop, showPausedDemoView, showRunningDemoView, toggleDemo, waitDelay, redoDemoMove, isNotTopDisc, hasNoMoves } from './viewHelpers/aiHelpers.js';
import { containerDiscCount, containerHasDisc, containerIsEmpty, containerTopDisc, findContainerByDiscID, hasMovesToUndo, hasMovesToRedo, isOver, isValidMove, containerIsCompatible, containerBottomDisc, discBelowMe, discInFinalRestingPlace } from './viewHelpers/gameViewGameInterface.js';

export function GameView() {
  this.resetGame();

  this.demoTimeout;
  this.demoDelay = 10;
}

GameView.prototype.genTowerImgDiv = genTowerImgDiv;
GameView.prototype.genDiscContainerDiv = genDiscContainerDiv;
GameView.prototype.updateScoreView = updateScoreView;
GameView.prototype.updateScoreView = updateScoreView;

GameView.prototype.gameIsOver = gameIsOver;
GameView.prototype.gameOverActions = gameOverActions;

// * setup / reset *
GameView.prototype.resetGame = resetGame;
GameView.prototype.setupView = setupView;
GameView.prototype.bindEvents = bindEvents;

// * getters *
GameView.prototype.getContainerByID = getContainerByID;
GameView.prototype.getDiscByID = getDiscByID;

// * game interface *
GameView.prototype.isValidMove = isValidMove;
GameView.prototype.findContainerByDiscID = findContainerByDiscID;
GameView.prototype.containerHasDisc = containerHasDisc;
GameView.prototype.containerTopDisc = containerTopDisc;
GameView.prototype.containerBottomDisc = containerBottomDisc;
GameView.prototype.discBelowMe = discBelowMe;
GameView.prototype.discInFinalRestingPlace = discInFinalRestingPlace;
GameView.prototype.containerIsEmpty = containerIsEmpty;
GameView.prototype.containerIsCompatible = containerIsCompatible;
GameView.prototype.containerDiscCount = containerDiscCount;
GameView.prototype.isOver = isOver;
GameView.prototype.hasMovesToUndo = hasMovesToUndo;
GameView.prototype.hasMovesToRedo = hasMovesToRedo;

// * moving discs *
GameView.prototype.targetSelected = targetSelected;
GameView.prototype.completeMove = completeMove;
GameView.prototype.moveDisc = moveDisc;

// * disc selection *
GameView.prototype.toggleTargetHover = toggleTargetHover;
GameView.prototype.toggleDiscSelect = toggleDiscSelect;
GameView.prototype.toggleValidTargets = toggleValidTargets;
GameView.prototype.genDiscShadow = genDiscShadow;
GameView.prototype.discIsSelected = discIsSelected;

// * undo / redo *
GameView.prototype.undoMove = undoMove;
GameView.prototype.redoMove = redoMove;
GameView.prototype.updateUndoRedoButtons = updateUndoRedoButtons;
GameView.prototype.undoRedo = undoRedo;

// * AI *
GameView.prototype.waitDelay = waitDelay;
GameView.prototype.showRunningDemoView = showRunningDemoView;
GameView.prototype.showPausedDemoView = showPausedDemoView;
GameView.prototype.pauseDemo = pauseDemo;
GameView.prototype.startDemo = startDemo;
GameView.prototype.endDemo = endDemo;
GameView.prototype.runDemo = runDemo;
GameView.prototype.hasMovesToRedo = hasMovesToRedo;
GameView.prototype.redoDemoMove = redoDemoMove;
GameView.prototype.runAILoop = runAILoop;
GameView.prototype.toggleDemo = toggleDemo;
GameView.prototype.isNotTopDisc = isNotTopDisc;
GameView.prototype.hasNoMoves = hasNoMoves;

GameView.prototype.myDisableToggle = function(bool, ...objs) {  // ! i'm not sure if I even use this
  objs.forEach(obj => {
    obj.attr('disabled', bool);
  })
}