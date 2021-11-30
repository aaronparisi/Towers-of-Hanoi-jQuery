export function bindEvents() {
  let myThis = this;

  $('*').off('click');
  $('*').off('mouseenter');
  $('*').off('mouseleave');  // todo maybe don't just reset the entire game when you click the reset button??

  // selecting discs
  $('.disc-container').on({
    mouseenter: function(event) {
      if (! myThis.discIsSelected()) {
        $(event.currentTarget).addClass('hovered-disc')
      }
    },
    mouseleave: function(event) {
      $(event.currentTarget).removeClass('hovered-disc')
    },
    click: function(event) {
      myThis.toggleDiscSelect($(event.currentTarget));
    }
  }, '.disc:first-child:not(.disc-shadow)')

  // selecting disc destination
  $('.tower').on({
    mouseenter: function(event) {
      myThis.toggleTargetHover($(event.currentTarget));
    },
    mouseleave: function(event) {
      myThis.toggleTargetHover($(event.currentTarget));
    },
    click: function(event) {
      myThis.targetSelected($(event.currentTarget));
    }
  }, '.valid-target')

  // buttons
  $('.reset').on('click', function(event) {
    myThis.resetGame()
  });

  $('#undo').on('click', function(event) {
    myThis.undoMove();
  })

  $('#redo').on('click', function(event) {
    myThis.redoMove();
  })

  $('.demo').on('click', function(event) {
    console.log(myThis)
    myThis.toggleDemo();
  })
}