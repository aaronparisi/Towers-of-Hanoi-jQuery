export function isValidMove(discID, containerID) {
  // returns true if given discID can be moved to given container
  return this.game.isValidMove(discID, containerID);
}

export function findContainerByDiscID(discID) {
  return this.game.findContainerByDiscID(discID);
}

export function containerHasDisc(discID, contID) {
  return this.game.containerHasDisc(discID, contID)
}

export function containerTopDisc(contID) {
  return this.game.containerTopDisc(contID);
}

export function containerBottomDisc(contID) {
  return this.game.containerBottomDisc(contID);
}

export function discBelowMe(discID, contID) {
  return this.game.discBelowMe(discID, contID);
}

export function containerIsEmpty(contID) {
  return this.game.containerIsEmpty(contID);
}

export function containerIsCompatible(discID, contID) {
  return this.game.containerIsCompatible(discID, contID);
}

export function containerDiscCount(contID) {
  return this.game.containerDiscCount(contID);
}

export function isOver() {
  return this.game.isOver();
}

export function hasMovesToUndo() {
  return this.game.hasMovesToUndo();
}

export function hasMovesToRedo() {
  return this.game.hasMovesToRedo();
}

export function discInFinalRestingPlace(discID, contID) {
  if (contID !== 2) {
    return false;
  } else if (
    (discID === 7) &&
    (this.containerBottomDisc(contID) === discID)
    ) {
      return true;
    } else {
    // debugger
    return (
      (this.discBelowMe(discID, contID) === discID + 1) &&
      (this.discInFinalRestingPlace(discID+1, contID))
    )
  }
}