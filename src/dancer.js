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

  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.stepHistory = {
     positions: [],
     currentIndex: 0,
  };
  this._initHistory(top, left);
  this.setPosition(top, left);

}

Dancer.prototype.step = function() {
  var dancerToStep = this;
  setTimeout(function() { dancerToStep.step(); }, this.timeBetweenSteps);
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
    this.$node.css(styleSettings);
}
Dancer.prototype._initHistory = function(top, left) {
  for (var i = 0; i < 100; i++) {
    this.stepHistory[i] = {top: top, left: left};
  }
};
