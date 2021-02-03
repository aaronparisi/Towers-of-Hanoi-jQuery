export function discIsSelected() {
  return $('.selected-disc').length === 1;
}

export function toggleTargetHover($container) {
  $container.children().first().toggleClass('invisible');
  $container.parent().toggleClass('hovered-valid-target');
}

export function toggleDiscSelect($clickedDisc) {
  $clickedDisc.toggleClass('selected-disc')
  $('body').toggleClass('disc-selected')
  this.toggleValidTargets();
}

export function toggleValidTargets() {
  let $selectedDisc = $('.selected-disc').first();

  if ($selectedDisc.length) {
    let $validTargets = $('.disc-container').filter((idx, cont) => {
      return this.game.board.isValidMove($selectedDisc.data('discID'), $(cont).data('containerID'));
    })

    $validTargets.addClass('valid-target').prepend(this.genDiscShadow());
  } else {
    $('.disc-container').removeClass('valid-target')
    $('.disc-shadow').remove();
  }
}

export function genDiscShadow() {
  let $templateDisc = $('.selected-disc');  // ? necessary?
  let $disc = $('<div></div>')
  .addClass('disc disc-shadow invisible')
  .width($templateDisc.outerWidth());
  
  return $disc;
}