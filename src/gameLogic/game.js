import { Board } from './board.js'

export function Game() {
  this.board = new Board();

  this.moves = [];
  this.moveIdx = -1;

  this.score = 0;
}

Game.prototype.isValidMove = function(discID, containerID) {
  // returns true if given discID can be moved to given container
  return this.board.isValidMove(discID, containerID);
}

Game.prototype.findContainerByDiscID = function(discID) {
  return this.board.findContainerByDiscID(discID);
}

Game.prototype.containerHasDisc = function(discID, contID) {
  return this.board.containerHasDisc(discID, contID)
}

Game.prototype.containerTopDisc = function(contID) {
  return this.board.containerTopDisc(contID);
}

Game.prototype.containerBottomDisc = function(contID) {
  return this.board.containerBottomDisc(contID);
}

Game.prototype.discBelowMe = function(discID, contID) {
  return this.board.discBelowMe(discID, contID);
}

Game.prototype.containerIsEmpty = function(contID) {
  return this.board.containerIsEmpty(contID);
}

Game.prototype.containerIsCompatible = function(discID, contID) {
  return this.board.containerIsCompatible(discID, contID);
}

Game.prototype.containerDiscCount = function(contID) {
  return this.board.containerDiscCount(contID);
}

Game.prototype.isOver = function() {
  return this.board.containerDiscCount(2) === 8;
}

Game.prototype.moveDisc = function(fromContID, toContID) {
  // I want to be able to undo a bunch of moves, redo them,
  // and also "override" undone moves with a new move
  // that can all happen here depending on how I modify the moves array
  this.lopOffMoves();

  this.board.moveDisc(fromContID, toContID);
  this.score++;

  this.moves.push(
    {
      "discID": this.board.containerTopDisc(toContID),  // at this point, the moved discID lives on top of the "to container"
      "sourceID": fromContID,
      "destinationID": toContID,
    }
  )
  this.moveIdx++;

}

Game.prototype.lopOffMoves = function() {
  // removes "undone moves" from end of moves array
  // called when making a move because once a move is "made"
  // any "undone" moves that haven't been "redone" yet just go away
  while(this.moveIdx < this.moves.length-1) {
    this.moves.pop();
  }
}

Game.prototype.undoMove = function() {
  let moveToUndo = this.moves[this.moveIdx];
  let undoSourceID = moveToUndo.destinationID;
  let undoDestinationID = moveToUndo.sourceID;

  let discMovedID = this.board.moveDisc(undoSourceID, undoDestinationID);

  this.moveIdx--;
  this.score--;

  return {
    targetID: undoDestinationID,
    discID: discMovedID
  }
}

Game.prototype.getCurrentMove = function() {
  return this.moves[this.moveIdx];
}

Game.prototype.redoMove = function() {
  let moveToRedo = this.moves[this.moveIdx+1];
  let redoSourceID = moveToRedo.sourceID;
  let redoDestinationID = moveToRedo.destinationID;

  let discMovedID = this.board.moveDisc(redoSourceID, redoDestinationID);

  this.moveIdx++;
  this.score++;

  return {
    targetID: redoDestinationID,
    discID: discMovedID
  }
}

Game.prototype.hasMovesToUndo = function() {
  return this.moveIdx >= 0;
}

Game.prototype.hasMovesToRedo = function() {
  return this.moveIdx < this.moves.length-1;
}