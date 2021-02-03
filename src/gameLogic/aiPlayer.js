export function AIPlayer(gameView) {
  this.gameView = gameView;
  this.isThinking = false;
}

AIPlayer.prototype.startThinking = function() {
  this.isThinking = true;
}

AIPlayer.prototype.stopThinking = function() {
  this.isThinking = false;
}

AIPlayer.prototype.getThirdTower = function(idx1, idx2) {
  return [0, 1, 2].filter((towerIdx) => {
    return (towerIdx !== idx1 && towerIdx !== idx2)
  })[0];
}

AIPlayer.prototype.discAtTarget = function(discIdx, targetIdx) {
  return this.gameView.containerHasDisc(discIdx, targetIdx);
}

AIPlayer.prototype.readyToMove = function(discIdx, targetIdx, sourceIdx) {
  return (
    this.gameView.containerTopDisc(sourceIdx) === discIdx &&
    this.gameView.containerIsCompatible(discIdx, targetIdx)
  );
}

AIPlayer.prototype.getDemoMove = function(discIdx, targetIdx) {
  let sourceIdx = this.gameView.findContainerByDiscID(discIdx);
  let spareIdx = this.getThirdTower(targetIdx, sourceIdx)
  
  if (this.discAtTarget(discIdx, targetIdx)) { // given disc is already at its target => move stuff on top of it
    return this.getDemoMove(discIdx-1, targetIdx)
  } else if (this.readyToMove(discIdx, targetIdx, sourceIdx)) {  // given disc is ready to move => move it
    return new Promise((resolve, reject) => {
      resolve({
        discID: discIdx,
        fromContID: sourceIdx,
        toContID: targetIdx
      });
    });
  } else {  // given disc is neither at its target nor ready to move
    return this.getDemoMove(discIdx-1, spareIdx);
  }
}