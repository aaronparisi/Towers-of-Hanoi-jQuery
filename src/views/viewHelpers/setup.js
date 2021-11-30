import { Game } from '../../gameLogic/game.js'
import { AIPlayer } from '../../gameLogic/aiPlayer.js'

export function resetGame() {
  this.game = new Game();
  this.AIPlayer = new AIPlayer(this);

  $('button').not($('.demo')).attr('disabled', true);
  $('.demo').html('Run Demo').attr('disabled', false);
  $('body').removeClass('disc-selected');

  $('.board').html("");
  this.updateScoreView();

  this.setupView();
  this.bindEvents();
}

export function updateScoreView() {
  $('.score').html(this.game.score);
}

export function genTowerImgDiv() {
  return $('<div></div>')
    .addClass('tower-image')
    .append('<div class="stalk"></div>')
    .append('<div class="base"></div>');
}

export function genDiscContainerDiv(i) {
  return $(`<div></div>`)
    .addClass('disc-container')
    .attr('id', `disc-container${i}`)
    .data('containerID', i);
}

export function setupView() {
  for (let i=0; i<3; i++) {
    let $towerDiv = $('<div></div>').addClass('tower').attr('id', `tower${i}`).data('towerID', i);

    let $towerImgDiv = this.genTowerImgDiv();  // returns a jQuery object
    let $discContainerDiv = this.genDiscContainerDiv(i);  // another jQuery object

    $towerDiv.append($discContainerDiv);
    $towerDiv.append($towerImgDiv);

    $('.board').append($towerDiv);
  }

  for (let i=0; i<8; i++) {
    let multiplier = 15;
    let addr = 2;
    let $disc = $('<div></div>').addClass('disc').attr('id', `disc${i}`).data('discID', i);
    
    $disc.width(`${(i+1)*12 + 3}%`);
    $disc.css('backgroundColor', `rgb(${252-((i+addr)*multiplier)}, ${231-((i+addr)*multiplier)}, ${92-((i+addr)*multiplier)})`);

    $('#disc-container0').append($disc);
  }
}

export function gameIsOver() {
  return this.game.isOver();
}

export function gameOverActions() {
  // remove hover and click handlers
  // $('.disc-container, .tower').off('mouseenter')
  // $('.disc-container, .tower').off('mouseleave')
  // $('.disc-container, .tower').off('click')

  this.updateUndoRedoButtons();
  $('.demo').attr('disabled', true);
  $('.reset').attr('disabled', false);

  // $('#tower2').addClass('winning-tower')
}