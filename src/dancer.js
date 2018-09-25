// Creates and returns a new dancer object that can step
// var makeDancer = function(top, left, timeBetweenSteps) {

//   var dancer = {};

//   // use jQuery to create an HTML <span> tag
//   dancer.$node = $('<span class="dancer"></span>');

//   dancer.step = function() {
//     // the basic dancer doesn't do anything interesting at all on each step,
//     // it just schedules the next step
//     setTimeout(dancer.step, timeBetweenSteps);
//   };
//   dancer.step();

//   dancer.setPosition = function(top, left) {
//     // Use css top and left properties to position our <span> tag
//     // where it belongs on the page. See http://api.jquery.com/css/
//     //
//     var styleSettings = {
//       top: top,
//       left: left
//     };
//     dancer.$node.css(styleSettings);
//   };

//   // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
//   // this one sets the position to some random default point within the body
//   dancer.setPosition(top, left);

//   return dancer;
// };

var Dancer = function(top, left, timeBetweenSteps) {
  
  this.oldStep = Dancer.prototype.step;
  this.$node = $('<span class="dancer"></span>');
  this.directFollower = null;
  this.timeBetweenSteps = timeBetweenSteps;
  this.stepHistory = {
     positions: [],
     currentIndex: 0,
  };
  this._initHistory(top, left);
  this.oldStep();
  this.setPosition(top, left);
  
}

Dancer.prototype.step = function() {
  var dancerToStep = this;
    if(this.timeBetweenSteps) {
      setTimeout(function() { dancerToStep.step(); }, this.timeBetweenSteps);
    }
    if(this.directFollower !== null && this.linePosition === undefined) {
      this.directFollower.step();
  }
}

Dancer.prototype._moveIntoLine = function() {
  var currentPosition = this.stepHistory[this.stepHistory.currentIndex];
  var nextTop = (currentPosition.top - this.linePosition.top) * 0.9 + this.linePosition.top;
  var nextLeft = (currentPosition.left - this.linePosition.left) * 0.9 + this.linePosition.left;
  this.setPosition(nextTop, nextLeft);
}

Dancer.prototype.lineUp = function(targetPosition) {
  clearActive();
  this._positionHolder = this.stepHistory[this.stepHistory.currentIndex];
  this.linePosition = targetPosition;
  this._stepHolder = this.step;
  this.step = function() { 
    var holdTimer = this.timeBetweenSteps;
    this.timeBetweenSteps = 20;
    this.oldStep(); 
    this._moveIntoLine();
    this.timeBetweenSteps = holdTimer;
  } 
  if (this.$node.hasClass("follower")) {
    this.step();
  }
}

Dancer.prototype.breakLine = function() {
  delete this._positionHolder;
  delete this.linePosition;
  this.step = this._stepHolder;
  delete this._stepHolder;
}

Dancer.prototype._silentSetPosition = function(top, left) {
  var styleSettings = {
      top: top,
      left: left
    };
  this.stepHistory[this.stepHistory.currentIndex] = styleSettings;
  this.$node.css(styleSettings);
}

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
      top: top,
      left: left
    };
    this.stepHistory.currentIndex++;
    if (this.stepHistory.currentIndex > 99) {
      this.stepHistory.currentIndex = 0;
    }
    this.stepHistory[this.stepHistory.currentIndex] = styleSettings;
    this.stepHistory[this.stepHistory.currentIndex].color = this.$node.css("border-color");
    this.$node.css(styleSettings);
}
Dancer.prototype._initHistory = function(top, left) {
  for (var i = 0; i < 100; i++) {
    this.stepHistory[i] = {top: top, left: left};
  }
};

Dancer.prototype.getPosition = function() {
  
  return this.stepHistory[this.stepHistory.currentIndex];
};

