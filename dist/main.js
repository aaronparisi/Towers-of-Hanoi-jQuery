/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameLogic/aiPlayer.js":
/*!***********************************!*\
  !*** ./src/gameLogic/aiPlayer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AIPlayer\": () => /* binding */ AIPlayer\n/* harmony export */ });\nfunction AIPlayer(gameView) {\n  this.gameView = gameView;\n  this.isThinking = false;\n}\n\nAIPlayer.prototype.startThinking = function() {\n  this.isThinking = true;\n}\n\nAIPlayer.prototype.stopThinking = function() {\n  this.isThinking = false;\n}\n\nAIPlayer.prototype.getThirdTower = function(idx1, idx2) {\n  return [0, 1, 2].filter((towerIdx) => {\n    return (towerIdx !== idx1 && towerIdx !== idx2)\n  })[0];\n}\n\nAIPlayer.prototype.discAtTarget = function(discIdx, targetIdx) {\n  return this.gameView.containerHasDisc(discIdx, targetIdx);\n}\n\nAIPlayer.prototype.readyToMove = function(discIdx, targetIdx, sourceIdx) {\n  return (\n    this.gameView.containerTopDisc(sourceIdx) === discIdx &&\n    this.gameView.containerIsCompatible(discIdx, targetIdx)\n  );\n}\n\nAIPlayer.prototype.getDemoMove = function(discIdx, targetIdx) {\n  let sourceIdx = this.gameView.findContainerByDiscID(discIdx);\n  let spareIdx = this.getThirdTower(targetIdx, sourceIdx)\n  \n  if (this.discAtTarget(discIdx, targetIdx)) { // given disc is already at its target => move stuff on top of it\n    return this.getDemoMove(discIdx-1, targetIdx)\n  } else if (this.readyToMove(discIdx, targetIdx, sourceIdx)) {  // given disc is ready to move => move it\n    return new Promise((resolve, reject) => {\n      resolve({\n        discID: discIdx,\n        fromContID: sourceIdx,\n        toContID: targetIdx\n      });\n    });\n  } else {  // given disc is neither at its target nor ready to move\n    return this.getDemoMove(discIdx-1, spareIdx);\n  }\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/gameLogic/aiPlayer.js?");

/***/ }),

/***/ "./src/gameLogic/board.js":
/*!********************************!*\
  !*** ./src/gameLogic/board.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => /* binding */ Board\n/* harmony export */ });\nfunction Board() {\n  // this.containers = {\n  //   0: [],\n  //   1: [],\n  //   2: []\n  // }\n  this.containers = [\n    [],\n    [],\n    []\n  ]\n\n  this.numDiscs = 8;  // ? can I make this flexible?\n\n  this.setupDiscs();\n}\n\nBoard.prototype.setupDiscs = function() {\n  for (let i=0; i<this.numDiscs; i++) {\n    this.addToBottom(i, 0);\n  }\n}\n\nBoard.prototype.isValidMove = function(discID, containerID) {\n  // returns true if given discID can be moved to given container\n  if (this.containerIsEmpty(containerID)) {\n    return true;\n  } else {\n    let topDisc = this.containerTopDisc(containerID);\n    return topDisc > discID;\n  }\n}\n\nBoard.prototype.moveDisc = function(fromContID, toContID) {\n  let discToMove = this.removeFromTop(fromContID);\n  this.addToTop(discToMove, toContID);\n\n  return discToMove;\n}\n\nBoard.prototype.addToTop = function(discID, contID) {\n  this.containers[contID].unshift(discID);\n  // ? return something?\n}\n\nBoard.prototype.addToBottom = function(discID, contID) {\n  this.containers[contID].push(discID);\n  // ? return something?\n}\n\nBoard.prototype.removeFromTop = function(contID) {\n  return this.containers[contID].shift();\n}\n\nBoard.prototype.findContainerByDiscID = function(discID) {\n  let ret;\n  this.containers.forEach((cont, idx) => {\n    if (cont.includes(discID)) {\n      ret = idx;\n    }\n  })\n  return ret;\n}\n\nBoard.prototype.containerHasDisc = function(discID, contID) {\n  return this.containers[contID].includes(discID);\n}\n\nBoard.prototype.containerTopDisc = function(contID) {\n  return this.containers[contID][0];\n}\n\nBoard.prototype.containerBottomDisc = function(contID) {\n  let thisCont = this.containers[contID];\n  return thisCont[thisCont.length-1];\n}\n\nBoard.prototype.discBelowMe = function(discID, contID) {\n  let numDiscs = this.containerDiscCount(contID);\n  let thisCont = this.containers[contID];\n  let ret;\n\n  for (let i=0; i<numDiscs; i++) {\n    if (thisCont[i] === discID) {\n      ret = thisCont[i+1];\n    }\n  }\n\n  return ret;\n}\n\nBoard.prototype.containerIsEmpty = function(contID) {\n  return this.containers[contID].length === 0;\n}\n\nBoard.prototype.containerIsCompatible = function(discID, contID) {\n  return (\n    this.containerIsEmpty(contID) ||\n    this.containerTopDisc(contID) > discID\n  )\n}\n\nBoard.prototype.containerDiscCount = function(contID) {\n  return this.containers[contID].length;\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/gameLogic/board.js?");

/***/ }),

/***/ "./src/gameLogic/game.js":
/*!*******************************!*\
  !*** ./src/gameLogic/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ \"./src/gameLogic/board.js\");\n\n\nfunction Game() {\n  this.board = new _board_js__WEBPACK_IMPORTED_MODULE_0__.Board();\n\n  this.moves = [];\n  this.moveIdx = -1;\n\n  this.score = 0;\n}\n\nGame.prototype.isValidMove = function(discID, containerID) {\n  // returns true if given discID can be moved to given container\n  return this.board.isValidMove(discID, containerID);\n}\n\nGame.prototype.findContainerByDiscID = function(discID) {\n  return this.board.findContainerByDiscID(discID);\n}\n\nGame.prototype.containerHasDisc = function(discID, contID) {\n  return this.board.containerHasDisc(discID, contID)\n}\n\nGame.prototype.containerTopDisc = function(contID) {\n  return this.board.containerTopDisc(contID);\n}\n\nGame.prototype.containerBottomDisc = function(contID) {\n  return this.board.containerBottomDisc(contID);\n}\n\nGame.prototype.discBelowMe = function(discID, contID) {\n  return this.board.discBelowMe(discID, contID);\n}\n\nGame.prototype.containerIsEmpty = function(contID) {\n  return this.board.containerIsEmpty(contID);\n}\n\nGame.prototype.containerIsCompatible = function(discID, contID) {\n  return this.board.containerIsCompatible(discID, contID);\n}\n\nGame.prototype.containerDiscCount = function(contID) {\n  return this.board.containerDiscCount(contID);\n}\n\nGame.prototype.isOver = function() {\n  return this.board.containerDiscCount(2) === 8;\n}\n\nGame.prototype.moveDisc = function(fromContID, toContID) {\n  // I want to be able to undo a bunch of moves, redo them,\n  // and also \"override\" undone moves with a new move\n  // that can all happen here depending on how I modify the moves array\n  this.lopOffMoves();\n\n  this.board.moveDisc(fromContID, toContID);\n  this.score++;\n\n  this.moves.push(\n    {\n      \"discID\": this.board.containerTopDisc(toContID),  // at this point, the moved discID lives on top of the \"to container\"\n      \"sourceID\": fromContID,\n      \"destinationID\": toContID,\n    }\n  )\n  this.moveIdx++;\n\n}\n\nGame.prototype.lopOffMoves = function() {\n  // removes \"undone moves\" from end of moves array\n  // called when making a move because once a move is \"made\"\n  // any \"undone\" moves that haven't been \"redone\" yet just go away\n  while(this.moveIdx < this.moves.length-1) {\n    this.moves.pop();\n  }\n}\n\nGame.prototype.undoMove = function() {\n  let moveToUndo = this.moves[this.moveIdx];\n  let undoSourceID = moveToUndo.destinationID;\n  let undoDestinationID = moveToUndo.sourceID;\n\n  let discMovedID = this.board.moveDisc(undoSourceID, undoDestinationID);\n\n  this.moveIdx--;\n  this.score--;\n\n  return {\n    targetID: undoDestinationID,\n    discID: discMovedID\n  }\n}\n\nGame.prototype.getCurrentMove = function() {\n  return this.moves[this.moveIdx];\n}\n\nGame.prototype.redoMove = function() {\n  let moveToRedo = this.moves[this.moveIdx+1];\n  let redoSourceID = moveToRedo.sourceID;\n  let redoDestinationID = moveToRedo.destinationID;\n\n  let discMovedID = this.board.moveDisc(redoSourceID, redoDestinationID);\n\n  this.moveIdx++;\n  this.score++;\n\n  return {\n    targetID: redoDestinationID,\n    discID: discMovedID\n  }\n}\n\nGame.prototype.hasMovesToUndo = function() {\n  return this.moveIdx >= 0;\n}\n\nGame.prototype.hasMovesToRedo = function() {\n  return this.moveIdx < this.moves.length-1;\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/gameLogic/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_gameView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/gameView.js */ \"./src/views/gameView.js\");\n/* harmony import */ var _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic/game.js */ \"./src/gameLogic/game.js\");\n\n\n\n$(() => {\n  // Your code here\n  let myGame = new _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__.Game();\n  new _views_gameView_js__WEBPACK_IMPORTED_MODULE_0__.GameView(myGame);\n});\n\n\n//# sourceURL=webpack://TowersOfHanoi/./src/index.js?");

/***/ }),

/***/ "./src/views/gameView.js":
/*!*******************************!*\
  !*** ./src/views/gameView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameView\": () => /* binding */ GameView\n/* harmony export */ });\n/* harmony import */ var _viewHelpers_bindEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewHelpers/bindEvents.js */ \"./src/views/viewHelpers/bindEvents.js\");\n/* harmony import */ var _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewHelpers/setup.js */ \"./src/views/viewHelpers/setup.js\");\n/* harmony import */ var _viewHelpers_getters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewHelpers/getters.js */ \"./src/views/viewHelpers/getters.js\");\n/* harmony import */ var _viewHelpers_movers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewHelpers/movers.js */ \"./src/views/viewHelpers/movers.js\");\n/* harmony import */ var _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewHelpers/discSelection.js */ \"./src/views/viewHelpers/discSelection.js\");\n/* harmony import */ var _viewHelpers_undoRedo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewHelpers/undoRedo.js */ \"./src/views/viewHelpers/undoRedo.js\");\n/* harmony import */ var _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewHelpers/aiHelpers.js */ \"./src/views/viewHelpers/aiHelpers.js\");\n/* harmony import */ var _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./viewHelpers/gameViewGameInterface.js */ \"./src/views/viewHelpers/gameViewGameInterface.js\");\n\n\n\n\n\n\n\n\n\nfunction GameView() {\n  this.resetGame();\n\n  this.demoTimeout;\n  this.demoDelay = 10;\n}\n\nGameView.prototype.genTowerImgDiv = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.genTowerImgDiv;\nGameView.prototype.genDiscContainerDiv = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.genDiscContainerDiv;\nGameView.prototype.updateScoreView = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.updateScoreView;\nGameView.prototype.updateScoreView = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.updateScoreView;\n\nGameView.prototype.gameIsOver = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.gameIsOver;\nGameView.prototype.gameOverActions = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.gameOverActions;\n\n// * setup / reset *\nGameView.prototype.resetGame = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.resetGame;\nGameView.prototype.setupView = _viewHelpers_setup_js__WEBPACK_IMPORTED_MODULE_1__.setupView;\nGameView.prototype.bindEvents = _viewHelpers_bindEvents_js__WEBPACK_IMPORTED_MODULE_0__.bindEvents;\n\n// * getters *\nGameView.prototype.getContainerByID = _viewHelpers_getters_js__WEBPACK_IMPORTED_MODULE_2__.getContainerByID;\nGameView.prototype.getDiscByID = _viewHelpers_getters_js__WEBPACK_IMPORTED_MODULE_2__.getDiscByID;\n\n// * game interface *\nGameView.prototype.isValidMove = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.isValidMove;\nGameView.prototype.findContainerByDiscID = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.findContainerByDiscID;\nGameView.prototype.containerHasDisc = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerHasDisc;\nGameView.prototype.containerTopDisc = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerTopDisc;\nGameView.prototype.containerBottomDisc = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerBottomDisc;\nGameView.prototype.discBelowMe = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.discBelowMe;\nGameView.prototype.discInFinalRestingPlace = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.discInFinalRestingPlace;\nGameView.prototype.containerIsEmpty = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerIsEmpty;\nGameView.prototype.containerIsCompatible = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerIsCompatible;\nGameView.prototype.containerDiscCount = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.containerDiscCount;\nGameView.prototype.isOver = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.isOver;\nGameView.prototype.hasMovesToUndo = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.hasMovesToUndo;\nGameView.prototype.hasMovesToRedo = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.hasMovesToRedo;\n\n// * moving discs *\nGameView.prototype.targetSelected = _viewHelpers_movers_js__WEBPACK_IMPORTED_MODULE_3__.targetSelected;\nGameView.prototype.completeMove = _viewHelpers_movers_js__WEBPACK_IMPORTED_MODULE_3__.completeMove;\nGameView.prototype.moveDisc = _viewHelpers_movers_js__WEBPACK_IMPORTED_MODULE_3__.moveDisc;\n\n// * disc selection *\nGameView.prototype.toggleTargetHover = _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__.toggleTargetHover;\nGameView.prototype.toggleDiscSelect = _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__.toggleDiscSelect;\nGameView.prototype.toggleValidTargets = _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__.toggleValidTargets;\nGameView.prototype.genDiscShadow = _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__.genDiscShadow;\nGameView.prototype.discIsSelected = _viewHelpers_discSelection_js__WEBPACK_IMPORTED_MODULE_4__.discIsSelected;\n\n// * undo / redo *\nGameView.prototype.undoMove = _viewHelpers_undoRedo_js__WEBPACK_IMPORTED_MODULE_5__.undoMove;\nGameView.prototype.redoMove = _viewHelpers_undoRedo_js__WEBPACK_IMPORTED_MODULE_5__.redoMove;\nGameView.prototype.updateUndoRedoButtons = _viewHelpers_undoRedo_js__WEBPACK_IMPORTED_MODULE_5__.updateUndoRedoButtons;\nGameView.prototype.undoRedo = _viewHelpers_undoRedo_js__WEBPACK_IMPORTED_MODULE_5__.undoRedo;\n\n// * AI *\nGameView.prototype.waitDelay = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.waitDelay;\nGameView.prototype.showRunningDemoView = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.showRunningDemoView;\nGameView.prototype.showPausedDemoView = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.showPausedDemoView;\nGameView.prototype.pauseDemo = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.pauseDemo;\nGameView.prototype.startDemo = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.startDemo;\nGameView.prototype.endDemo = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.endDemo;\nGameView.prototype.runDemo = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.runDemo;\nGameView.prototype.hasMovesToRedo = _viewHelpers_gameViewGameInterface_js__WEBPACK_IMPORTED_MODULE_7__.hasMovesToRedo;\nGameView.prototype.redoDemoMove = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.redoDemoMove;\nGameView.prototype.runAILoop = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.runAILoop;\nGameView.prototype.toggleDemo = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.toggleDemo;\nGameView.prototype.isNotTopDisc = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.isNotTopDisc;\nGameView.prototype.hasNoMoves = _viewHelpers_aiHelpers_js__WEBPACK_IMPORTED_MODULE_6__.hasNoMoves;\n\nGameView.prototype.myDisableToggle = function(bool, ...objs) {  // ! i'm not sure if I even use this\n  objs.forEach(obj => {\n    obj.attr('disabled', bool);\n  })\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/gameView.js?");

/***/ }),

/***/ "./src/views/viewHelpers/aiHelpers.js":
/*!********************************************!*\
  !*** ./src/views/viewHelpers/aiHelpers.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"waitDelay\": () => /* binding */ waitDelay,\n/* harmony export */   \"showRunningDemoView\": () => /* binding */ showRunningDemoView,\n/* harmony export */   \"showPausedDemoView\": () => /* binding */ showPausedDemoView,\n/* harmony export */   \"startDemo\": () => /* binding */ startDemo,\n/* harmony export */   \"pauseDemo\": () => /* binding */ pauseDemo,\n/* harmony export */   \"endDemo\": () => /* binding */ endDemo,\n/* harmony export */   \"redoDemoMove\": () => /* binding */ redoDemoMove,\n/* harmony export */   \"runDemo\": () => /* binding */ runDemo,\n/* harmony export */   \"runAILoop\": () => /* binding */ runAILoop,\n/* harmony export */   \"toggleDemo\": () => /* binding */ toggleDemo,\n/* harmony export */   \"isNotTopDisc\": () => /* binding */ isNotTopDisc,\n/* harmony export */   \"hasNoMoves\": () => /* binding */ hasNoMoves\n/* harmony export */ });\nfunction waitDelay() {\n  // returns a promise which resolves\n  // after a certain period of time\n  return new Promise((resolve, reject) => {\n    this.demoTimeout = setTimeout(() => {  // !! this issues?\n      resolve();\n    }, this.demoDelay);\n  });\n}\n\nfunction showRunningDemoView() {  // todo button stuff?  rename the fn??\n  $('.demo').html(\"Pause Demo\").attr('disabled', false);\n  $('.reset').attr('disabled', true);\n  $('.takback').attr('disabled', true);\n}\n\nfunction showPausedDemoView() {  // ? necessary?\n  $('.demo').html(\"Run Demo\").attr('disabled', false);\n  $('.reset').attr('disabled', false);\n  this.updateUndoRedoButtons();\n}\n\nfunction startDemo() {\n  this.AIPlayer.startThinking();\n  this.showRunningDemoView();\n  this.runDemo();\n}\n\nfunction pauseDemo() {\n  clearTimeout(this.demoTimeout);\n  this.AIPlayer.stopThinking();\n\n  this.showPausedDemoView();\n}\n\nfunction endDemo() {\n  clearTimeout(this.demoTimeout);\n  this.AIPlayer.stopThinking();\n  this.gameOverActions();\n}\n\nfunction redoDemoMove() {\n  return new Promise((resolve, reject) => {\n    this.waitDelay()\n    .then(() => {\n      return this.redoMove();\n    })\n    .then(() => {\n      resolve();\n    })\n    .catch(err => {\n      console.log(`error redoing moves: ${err.message}`);\n    })\n  })\n}\n\nfunction runDemo() {\n  if (this.game.hasMovesToRedo()) {\n    this.redoDemoMove()\n    .then(() => {\n      this.runDemo();\n    })\n  } else {\n    this.runAILoop();\n  }\n}\n\nfunction runAILoop() {\n  if (this.isOver()) {\n    this.endDemo();\n  } else {\n    this.waitDelay()\n    .then(() => {\n      return this.AIPlayer.getDemoMove(7, 2)\n    })\n    .then((demoMoveObj) => {\n      // move the game\n      let $targetContainer = this.getContainerByID(demoMoveObj.toContID);  // todo weird data back and forth\n      let $disc = this.getDiscByID(demoMoveObj.discID);\n      let $sourceContainer = this.getContainerByID(demoMoveObj.fromContID);\n\n      this.completeMove($sourceContainer, $targetContainer, $disc);\n    })\n    .then(() => {\n      this.runAILoop();\n    })\n  }\n}\n\nfunction toggleDemo() {\n  if (this.AIPlayer.isThinking) {\n    // demo is running, pause it\n    this.pauseDemo();\n  } else {\n    // demo is not running, run it\n    this.startDemo();\n  }\n}\n\n// todo make these more elegant\nfunction isNotTopDisc(discIdx) {\n  return (\n    this.game.board.containers[0][0].discID !== discIdx &&\n    this.game.board.containers[1][0].discID !== discIdx &&\n    this.game.board.containers[2][0].discID !== discIdx\n  )\n}\n\nfunction hasNoMoves(discIdx) {\n  return (\n    this.game.board.containers[0][0].discID >= discIdx &&\n    this.game.board.containers[1][0].discID >= discIdx &&\n    this.game.board.containers[2][0].discID >= discIdx\n  )\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/aiHelpers.js?");

/***/ }),

/***/ "./src/views/viewHelpers/bindEvents.js":
/*!*********************************************!*\
  !*** ./src/views/viewHelpers/bindEvents.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bindEvents\": () => /* binding */ bindEvents\n/* harmony export */ });\nfunction bindEvents() {\n  let myThis = this;\n\n  $('*').off('click');\n  $('*').off('mouseenter');\n  $('*').off('mouseleave');  // todo maybe don't just reset the entire game when you click the reset button??\n\n  // selecting discs\n  $('.disc-container').on({\n    mouseenter: function(event) {\n      if (! myThis.discIsSelected()) {\n        $(event.currentTarget).addClass('hovered-disc')\n      }\n    },\n    mouseleave: function(event) {\n      $(event.currentTarget).removeClass('hovered-disc')\n    },\n    click: function(event) {\n      myThis.toggleDiscSelect($(event.currentTarget));\n    }\n  }, '.disc:first-child:not(.disc-shadow)')\n\n  // selecting disc destination\n  $('.tower').on({\n    mouseenter: function(event) {\n      myThis.toggleTargetHover($(event.currentTarget));\n    },\n    mouseleave: function(event) {\n      myThis.toggleTargetHover($(event.currentTarget));\n    },\n    click: function(event) {\n      myThis.targetSelected($(event.currentTarget));\n    }\n  }, '.valid-target')\n\n  // buttons\n  $('.reset').on('click', function(event) {\n    myThis.resetGame()\n  });\n\n  $('#undo').on('click', function(event) {\n    myThis.undoMove();\n  })\n\n  $('#redo').on('click', function(event) {\n    myThis.redoMove();\n  })\n\n  $('.demo').on('click', function(event) {\n    console.log(myThis)\n    myThis.toggleDemo();\n  })\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/bindEvents.js?");

/***/ }),

/***/ "./src/views/viewHelpers/discSelection.js":
/*!************************************************!*\
  !*** ./src/views/viewHelpers/discSelection.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"discIsSelected\": () => /* binding */ discIsSelected,\n/* harmony export */   \"toggleTargetHover\": () => /* binding */ toggleTargetHover,\n/* harmony export */   \"toggleDiscSelect\": () => /* binding */ toggleDiscSelect,\n/* harmony export */   \"toggleValidTargets\": () => /* binding */ toggleValidTargets,\n/* harmony export */   \"genDiscShadow\": () => /* binding */ genDiscShadow\n/* harmony export */ });\nfunction discIsSelected() {\n  return $('.selected-disc').length === 1;\n}\n\nfunction toggleTargetHover($container) {\n  $container.children().first().toggleClass('invisible');\n  $container.parent().toggleClass('hovered-valid-target');\n}\n\nfunction toggleDiscSelect($clickedDisc) {\n  $clickedDisc.toggleClass('selected-disc')\n  $('body').toggleClass('disc-selected')\n  this.toggleValidTargets();\n}\n\nfunction toggleValidTargets() {\n  let $selectedDisc = $('.selected-disc').first();\n\n  if ($selectedDisc.length) {\n    let $validTargets = $('.disc-container').filter((idx, cont) => {\n      return this.game.board.isValidMove($selectedDisc.data('discID'), $(cont).data('containerID'));\n    })\n\n    $validTargets.addClass('valid-target').prepend(this.genDiscShadow());\n  } else {\n    $('.disc-container').removeClass('valid-target')\n    $('.disc-shadow').remove();\n  }\n}\n\nfunction genDiscShadow() {\n  let $templateDisc = $('.selected-disc');  // ? necessary?\n  let $disc = $('<div></div>')\n  .addClass('disc disc-shadow invisible')\n  .width($templateDisc.outerWidth());\n  \n  return $disc;\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/discSelection.js?");

/***/ }),

/***/ "./src/views/viewHelpers/gameViewGameInterface.js":
/*!********************************************************!*\
  !*** ./src/views/viewHelpers/gameViewGameInterface.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isValidMove\": () => /* binding */ isValidMove,\n/* harmony export */   \"findContainerByDiscID\": () => /* binding */ findContainerByDiscID,\n/* harmony export */   \"containerHasDisc\": () => /* binding */ containerHasDisc,\n/* harmony export */   \"containerTopDisc\": () => /* binding */ containerTopDisc,\n/* harmony export */   \"containerBottomDisc\": () => /* binding */ containerBottomDisc,\n/* harmony export */   \"discBelowMe\": () => /* binding */ discBelowMe,\n/* harmony export */   \"containerIsEmpty\": () => /* binding */ containerIsEmpty,\n/* harmony export */   \"containerIsCompatible\": () => /* binding */ containerIsCompatible,\n/* harmony export */   \"containerDiscCount\": () => /* binding */ containerDiscCount,\n/* harmony export */   \"isOver\": () => /* binding */ isOver,\n/* harmony export */   \"hasMovesToUndo\": () => /* binding */ hasMovesToUndo,\n/* harmony export */   \"hasMovesToRedo\": () => /* binding */ hasMovesToRedo,\n/* harmony export */   \"discInFinalRestingPlace\": () => /* binding */ discInFinalRestingPlace\n/* harmony export */ });\nfunction isValidMove(discID, containerID) {\n  // returns true if given discID can be moved to given container\n  return this.game.isValidMove(discID, containerID);\n}\n\nfunction findContainerByDiscID(discID) {\n  return this.game.findContainerByDiscID(discID);\n}\n\nfunction containerHasDisc(discID, contID) {\n  return this.game.containerHasDisc(discID, contID)\n}\n\nfunction containerTopDisc(contID) {\n  return this.game.containerTopDisc(contID);\n}\n\nfunction containerBottomDisc(contID) {\n  return this.game.containerBottomDisc(contID);\n}\n\nfunction discBelowMe(discID, contID) {\n  return this.game.discBelowMe(discID, contID);\n}\n\nfunction containerIsEmpty(contID) {\n  return this.game.containerIsEmpty(contID);\n}\n\nfunction containerIsCompatible(discID, contID) {\n  return this.game.containerIsCompatible(discID, contID);\n}\n\nfunction containerDiscCount(contID) {\n  return this.game.containerDiscCount(contID);\n}\n\nfunction isOver() {\n  return this.game.isOver();\n}\n\nfunction hasMovesToUndo() {\n  return this.game.hasMovesToUndo();\n}\n\nfunction hasMovesToRedo() {\n  return this.game.hasMovesToRedo();\n}\n\nfunction discInFinalRestingPlace(discID, contID) {\n  if (contID !== 2) {\n    return false;\n  } else if (\n    (discID === 7) &&\n    (this.containerBottomDisc(contID) === discID)\n    ) {\n      return true;\n    } else {\n    // debugger\n    return (\n      (this.discBelowMe(discID, contID) === discID + 1) &&\n      (this.discInFinalRestingPlace(discID+1, contID))\n    )\n  }\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/gameViewGameInterface.js?");

/***/ }),

/***/ "./src/views/viewHelpers/getters.js":
/*!******************************************!*\
  !*** ./src/views/viewHelpers/getters.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getContainerByID\": () => /* binding */ getContainerByID,\n/* harmony export */   \"getDiscByID\": () => /* binding */ getDiscByID\n/* harmony export */ });\nfunction getContainerByID(id) {\n  return $('.disc-container').filter((idx, cont) => {\n    return $(cont).data('containerID') === id;\n  })\n}\n\nfunction getDiscByID(id) {\n  return $('.disc').filter((idx, disc) => {\n    return $(disc).data('discID') === id;\n  })\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/getters.js?");

/***/ }),

/***/ "./src/views/viewHelpers/movers.js":
/*!*****************************************!*\
  !*** ./src/views/viewHelpers/movers.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"targetSelected\": () => /* binding */ targetSelected,\n/* harmony export */   \"completeMove\": () => /* binding */ completeMove,\n/* harmony export */   \"moveDisc\": () => /* binding */ moveDisc\n/* harmony export */ });\nfunction targetSelected($targetContainer) {\n  // vars\n  let $selectedDisc = $('.selected-disc')\n  let $sourceContainer = $selectedDisc.parent();\n\n  // move stuff in game and in view\n  this.completeMove($sourceContainer, $targetContainer, $selectedDisc);\n\n  // adjust game view for post move state\n  $targetContainer.parent().removeClass('hovered-valid-target');\n  $('.tower').removeClass('valid-target');\n  this.toggleDiscSelect($('.selected-disc'));\n}\n\nfunction completeMove($sourceContainer, $targetContainer, $selectedDisc) {\n  this.game.moveDisc($sourceContainer.data('containerID'), $targetContainer.data('containerID'));\n  this.moveDisc($selectedDisc, $targetContainer);\n}\n\nfunction moveDisc($disc, $targetContainer) {\n  let discID = $disc.data('discID')\n  $targetContainer.prepend($disc);\n  // check if game over\n  this.updateScoreView();\n  this.updateUndoRedoButtons();\n\n  // update buttons\n  $('.reset').attr('disabled', false);\n  $('.demo').attr('disabled', false).html('Pause');\n\n  if (this.discInFinalRestingPlace($disc.data('discID'), $targetContainer.data('containerID'))) {\n    $disc.css('backgroundColor', `rgb(${187-((discID+2)*16)}, ${225-((discID+2)*16)}, ${207-((discID+2)*16)})`);\n  } else {\n    $disc.css('backgroundColor', `rgb(${252-((discID+2)*15)}, ${231-((discID+2)*15)}, ${92-((discID+2)*15)})`);\n  }\n\n  if (this.game.isOver()) {\n    this.gameOverActions();\n  } else {\n    $('*').removeClass('winning-tower');\n  }\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/movers.js?");

/***/ }),

/***/ "./src/views/viewHelpers/setup.js":
/*!****************************************!*\
  !*** ./src/views/viewHelpers/setup.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resetGame\": () => /* binding */ resetGame,\n/* harmony export */   \"updateScoreView\": () => /* binding */ updateScoreView,\n/* harmony export */   \"genTowerImgDiv\": () => /* binding */ genTowerImgDiv,\n/* harmony export */   \"genDiscContainerDiv\": () => /* binding */ genDiscContainerDiv,\n/* harmony export */   \"setupView\": () => /* binding */ setupView,\n/* harmony export */   \"gameIsOver\": () => /* binding */ gameIsOver,\n/* harmony export */   \"gameOverActions\": () => /* binding */ gameOverActions\n/* harmony export */ });\n/* harmony import */ var _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gameLogic/game.js */ \"./src/gameLogic/game.js\");\n/* harmony import */ var _gameLogic_aiPlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../gameLogic/aiPlayer.js */ \"./src/gameLogic/aiPlayer.js\");\n\n\n\nfunction resetGame() {\n  this.game = new _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_0__.Game();\n  this.AIPlayer = new _gameLogic_aiPlayer_js__WEBPACK_IMPORTED_MODULE_1__.AIPlayer(this);\n\n  $('button').not($('.demo')).attr('disabled', true);\n  $('.demo').html('Run Demo').attr('disabled', false);\n  $('body').removeClass('disc-selected');\n\n  $('.board').html(\"\");\n  this.updateScoreView();\n\n  this.setupView();\n  this.bindEvents();\n}\n\nfunction updateScoreView() {\n  $('.score').html(this.game.score);\n}\n\nfunction genTowerImgDiv() {\n  return $('<div></div>')\n    .addClass('tower-image')\n    .append('<div class=\"stalk\"></div>')\n    .append('<div class=\"base\"></div>');\n}\n\nfunction genDiscContainerDiv(i) {\n  return $(`<div></div>`)\n    .addClass('disc-container')\n    .attr('id', `disc-container${i}`)\n    .data('containerID', i);\n}\n\nfunction setupView() {\n  for (let i=0; i<3; i++) {\n    let $towerDiv = $('<div></div>').addClass('tower').attr('id', `tower${i}`).data('towerID', i);\n\n    let $towerImgDiv = this.genTowerImgDiv();  // returns a jQuery object\n    let $discContainerDiv = this.genDiscContainerDiv(i);  // another jQuery object\n\n    $towerDiv.append($discContainerDiv);\n    $towerDiv.append($towerImgDiv);\n\n    $('.board').append($towerDiv);\n  }\n\n  for (let i=0; i<8; i++) {\n    let multiplier = 15;\n    let addr = 2;\n    let $disc = $('<div></div>').addClass('disc').attr('id', `disc${i}`).data('discID', i);\n    \n    $disc.width(`${(i+1)*12 + 3}%`);\n    $disc.css('backgroundColor', `rgb(${252-((i+addr)*multiplier)}, ${231-((i+addr)*multiplier)}, ${92-((i+addr)*multiplier)})`);\n\n    $('#disc-container0').append($disc);\n  }\n}\n\nfunction gameIsOver() {\n  return this.game.isOver();\n}\n\nfunction gameOverActions() {\n  // remove hover and click handlers\n  // $('.disc-container, .tower').off('mouseenter')\n  // $('.disc-container, .tower').off('mouseleave')\n  // $('.disc-container, .tower').off('click')\n\n  this.updateUndoRedoButtons();\n  $('.demo').attr('disabled', true);\n  $('.reset').attr('disabled', false);\n\n  // $('#tower2').addClass('winning-tower')\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/setup.js?");

/***/ }),

/***/ "./src/views/viewHelpers/undoRedo.js":
/*!*******************************************!*\
  !*** ./src/views/viewHelpers/undoRedo.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"undoRedo\": () => /* binding */ undoRedo,\n/* harmony export */   \"undoMove\": () => /* binding */ undoMove,\n/* harmony export */   \"redoMove\": () => /* binding */ redoMove,\n/* harmony export */   \"updateUndoRedoButtons\": () => /* binding */ updateUndoRedoButtons\n/* harmony export */ });\nfunction undoRedo(moveData) {\n  let $targetContainer = this.getContainerByID(moveData.targetID);\n  let $disc = this.getDiscByID(moveData.discID);\n\n  this.moveDisc($disc, $targetContainer);\n\n  return Promise.resolve();\n}\n\nfunction undoMove() {\n  this.undoRedo(this.game.undoMove());\n}\n\nfunction redoMove() {\n  this.undoRedo(this.game.redoMove());\n}\n\nfunction updateUndoRedoButtons() {\n  $('#undo').attr( 'disabled', ( ! this.game.hasMovesToUndo() ) )\n  $('#redo').attr( 'disabled', ( ! this.game.hasMovesToRedo() ) )\n}\n\n//# sourceURL=webpack://TowersOfHanoi/./src/views/viewHelpers/undoRedo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;