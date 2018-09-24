var LeftRunner = function(top, left) {
  this.oldStep = Dancer.prototype.step;
  Dancer.call(this, top, left, 10);
};

LeftRunner.prototype = Object.create(Dancer.prototype);
LeftRunner.prototype.constructor = LeftRunner;

LeftRunner.prototype.step = function() {
  this.oldStep();
  //debugger;
  var currentThing = this.$node;
  if(currentThing.attr('style') !== undefined) {
    var currentLeft = currentThing[0].style.left;
    var currentTop = currentThing[0].style.top;
    var prosLeft = currentLeft.slice(0, -2);
    currentLeft = parseFloat(prosLeft);
    if (currentLeft <= 0) {
      currentLeft = $("body").width() - 5;
    }
    currentTop = parseFloat(currentTop.slice(0, -2));
    this.setPosition(currentTop, currentLeft - 1);
  }
  //find current position;
  //if currentLeft = 0
    //set currentLeft to 1;
  //call setPosition(currentTop, currentLeft - 0.01);
};

var makeLeftRunner = function(top, left) {
  var newRunner = new LeftRunner(top, left);
  return newRunner;
};