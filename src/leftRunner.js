var LeftRunner = function(top, left) {
  //this.oldStep = Dancer.prototype.step;
  Dancer.call(this, top, left, 10);
};

LeftRunner.prototype = Object.create(Dancer.prototype);
LeftRunner.prototype.constructor = LeftRunner;

LeftRunner.prototype.step = function() {
  this.oldStep();
  var currentThing = this.$node;
  if(currentThing.attr('style') !== undefined) {
    var currentPosition = this.getPosition();
    if (currentPosition.left <= 0) {
      currentPosition.left = $("body").width() - 20;
    }
    this.setPosition(currentPosition.top, currentPosition.left - 1);
  }
};

var makeLeftRunner = function() {
  var newRunner = new LeftRunner(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      );
  return newRunner;
};