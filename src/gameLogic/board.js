export function Board() {
  // this.containers = {
  //   0: [],
  //   1: [],
  //   2: []
  // }
  this.containers = [
    [],
    [],
    []
  ]

  this.numDiscs = 8;  // ? can I make this flexible?

  this.setupDiscs();
}

Board.prototype.setupDiscs = function() {
  for (let i=0; i<this.numDiscs; i++) {
    this.addToBottom(i, 0);
  }
}

Board.prototype.isValidMove = function(discID, containerID) {
  // returns true if given discID can be moved to given container
  if (this.containerIsEmpty(containerID)) {
    return true;
  } else {
    let topDisc = this.containerTopDisc(containerID);
    return topDisc > discID;
  }
}

Board.prototype.moveDisc = function(fromContID, toContID) {
  let discToMove = this.removeFromTop(fromContID);
  this.addToTop(discToMove, toContID);

  return discToMove;
}

Board.prototype.addToTop = function(discID, contID) {
  this.containers[contID].unshift(discID);
  // ? return something?
}

Board.prototype.addToBottom = function(discID, contID) {
  this.containers[contID].push(discID);
  // ? return something?
}

Board.prototype.removeFromTop = function(contID) {
  return this.containers[contID].shift();
}

Board.prototype.findContainerByDiscID = function(discID) {
  let ret;
  this.containers.forEach((cont, idx) => {
    if (cont.includes(discID)) {
      ret = idx;
    }
  })
  return ret;
}

Board.prototype.containerHasDisc = function(discID, contID) {
  return this.containers[contID].includes(discID);
}

Board.prototype.containerTopDisc = function(contID) {
  return this.containers[contID][0];
}

Board.prototype.containerBottomDisc = function(contID) {
  let thisCont = this.containers[contID];
  return thisCont[thisCont.length-1];
}

Board.prototype.discBelowMe = function(discID, contID) {
  let numDiscs = this.containerDiscCount(contID);
  let thisCont = this.containers[contID];
  let ret;

  for (let i=0; i<numDiscs; i++) {
    if (thisCont[i] === discID) {
      ret = thisCont[i+1];
    }
  }

  return ret;
}

Board.prototype.containerIsEmpty = function(contID) {
  return this.containers[contID].length === 0;
}

Board.prototype.containerIsCompatible = function(discID, contID) {
  return (
    this.containerIsEmpty(contID) ||
    this.containerTopDisc(contID) > discID
  )
}

Board.prototype.containerDiscCount = function(contID) {
  return this.containers[contID].length;
}