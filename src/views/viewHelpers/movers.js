export function targetSelected($targetContainer) {
  // vars
  let $selectedDisc = $('.selected-disc')
  let $sourceContainer = $selectedDisc.parent();

  // move stuff in game and in view
  this.completeMove($sourceContainer, $targetContainer, $selectedDisc);

  // adjust game view for post move state
  $targetContainer.parent().removeClass('hovered-valid-target');
  $('.tower').removeClass('valid-target');
  this.toggleDiscSelect($('.selected-disc'));
}

export function completeMove($sourceContainer, $targetContainer, $selectedDisc) {
  this.game.moveDisc($sourceContainer.data('containerID'), $targetContainer.data('containerID'));
  this.moveDisc($selectedDisc, $targetContainer);
}

export function moveDisc($disc, $targetContainer) {
  let discID = $disc.data('discID')
  $targetContainer.prepend($disc);
  // check if game over
  this.updateScoreView();
  this.updateUndoRedoButtons();

  // update buttons
  $('.reset').attr('disabled', false);
  $('.demo').attr('disabled', false).html('Pause');

  if (this.discInFinalRestingPlace($disc.data('discID'), $targetContainer.data('containerID'))) {
    $disc.css('backgroundColor', `rgb(${187-((discID+2)*16)}, ${225-((discID+2)*16)}, ${207-((discID+2)*16)})`);
  } else {
    $disc.css('backgroundColor', `rgb(${252-((discID+2)*15)}, ${231-((discID+2)*15)}, ${92-((discID+2)*15)})`);
  }

  if (this.game.isOver()) {
    this.gameOverActions();
  } else {
    $('*').removeClass('winning-tower');
  }
}