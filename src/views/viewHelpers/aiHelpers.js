export function waitDelay() {
  // returns a promise which resolves
  // after a certain period of time
  return new Promise((resolve, reject) => {
    this.demoTimeout = setTimeout(() => {  // !! this issues?
      resolve();
    }, this.demoDelay);
  });
}

export function showRunningDemoView() {  // todo button stuff?  rename the fn??
  $('.demo').html("Pause Demo").attr('disabled', false);
  $('.reset').attr('disabled', true);
  $('.takback').attr('disabled', true);
}

export function showPausedDemoView() {  // ? necessary?
  $('.demo').html("Run Demo").attr('disabled', false);
  $('.reset').attr('disabled', false);
  this.updateUndoRedoButtons();
}

export function startDemo() {
  this.AIPlayer.startThinking();
  this.showRunningDemoView();
  this.runDemo();
}

export function pauseDemo() {
  clearTimeout(this.demoTimeout);
  this.AIPlayer.stopThinking();

  this.showPausedDemoView();
}

export function endDemo() {
  clearTimeout(this.demoTimeout);
  this.AIPlayer.stopThinking();
  this.gameOverActions();
}

export function redoDemoMove() {
  return new Promise((resolve, reject) => {
    this.waitDelay()
    .then(() => {
      return this.redoMove();
    })
    .then(() => {
      resolve();
    })
    .catch(err => {
      console.log(`error redoing moves: ${err.message}`);
    })
  })
}

export function runDemo() {
  if (this.game.hasMovesToRedo()) {
    this.redoDemoMove()
    .then(() => {
      this.runDemo();
    })
  } else {
    this.runAILoop();
  }
}

export function runAILoop() {
  if (this.isOver()) {
    this.endDemo();
  } else {
    this.waitDelay()
    .then(() => {
      return this.AIPlayer.getDemoMove(7, 2)
    })
    .then((demoMoveObj) => {
      // move the game
      let $targetContainer = this.getContainerByID(demoMoveObj.toContID);  // todo weird data back and forth
      let $disc = this.getDiscByID(demoMoveObj.discID);
      let $sourceContainer = this.getContainerByID(demoMoveObj.fromContID);

      this.completeMove($sourceContainer, $targetContainer, $disc);
    })
    .then(() => {
      this.runAILoop();
    })
  }
}

export function toggleDemo() {
  if (this.AIPlayer.isThinking) {
    // demo is running, pause it
    this.pauseDemo();
  } else {
    // demo is not running, run it
    this.startDemo();
  }
}

// todo make these more elegant
export function isNotTopDisc(discIdx) {
  return (
    this.game.board.containers[0][0].discID !== discIdx &&
    this.game.board.containers[1][0].discID !== discIdx &&
    this.game.board.containers[2][0].discID !== discIdx
  )
}

export function hasNoMoves(discIdx) {
  return (
    this.game.board.containers[0][0].discID >= discIdx &&
    this.game.board.containers[1][0].discID >= discIdx &&
    this.game.board.containers[2][0].discID >= discIdx
  )
}