export function undoRedo(moveData) {
  let $targetContainer = this.getContainerByID(moveData.targetID);
  let $disc = this.getDiscByID(moveData.discID);

  this.moveDisc($disc, $targetContainer);

  return Promise.resolve();
}

export function undoMove() {
  this.undoRedo(this.game.undoMove());
}

export function redoMove() {
  this.undoRedo(this.game.redoMove());
}

export function updateUndoRedoButtons() {
  $('#undo').attr( 'disabled', ( ! this.game.hasMovesToUndo() ) )
  $('#redo').attr( 'disabled', ( ! this.game.hasMovesToRedo() ) )
}