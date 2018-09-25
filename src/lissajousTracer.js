var LissajousTracer = function(verticalFreq, horizontalFreq) {
  Dancer.call(this, -30, -30, 20);
  this.verticalFreq = verticalFreq;
  this.horizontalFreq = horizontalFreq;
  this.currentParameter = 0.5;
}

LissajousTracer.prototype = Object.create(Dancer.prototype);
LissajousTracer.prototype.constructor = LissajousTracer;

LissajousTracer.prototype.step = function() {
  this.oldStep();
  if (this.currentParameter !== undefined) {
    this.currentParameter += 0.02;
    if (this.currentParameter > 6.5) {
      this.currentParameter -= 2 * Math.PI;
    }
    var newTop = Math.sin(this.verticalFreq * this.currentParameter) * 0.4 * $("body").height() + 0.5 * $("body").height();
    var newLeft = Math.sin(this.horizontalFreq * this.currentParameter) * 0.4 * $("body").width() + 0.5 * $("body").width();
    this.setPosition(newTop, newLeft);
  }
}

LissajousTracer.prototype.breakLine = function() {
  Dancer.prototype.breakLine.call(this);
  this.stepHolder = this.step;
  this.delayCounter = 50;
  this.step = function() {
    this.oldStep();
    if (this.currentParameter !== undefined) {
      this.currentParameter += 0.02;
      if (this.currentParameter > 6.5) {
        this.currentParameter -= 2 * Math.PI;
      }
      var newTop = Math.sin(this.verticalFreq * this.currentParameter) * 0.4 * $("body").height() + 0.5 * $("body").height();
      var newLeft = Math.sin(this.horizontalFreq * this.currentParameter) * 0.4 * $("body").width() + 0.5 * $("body").width();
      var currentPosition = this.getPosition();
      newTop = currentPosition.top + (newTop - currentPosition.top) * 0.01 * (50 - this.delayCounter);
      newLeft = currentPosition.left + (newLeft - currentPosition.left) * 0.01 * (50 - this.delayCounter);;
 
      this.setPosition(newTop, newLeft);
    }
    this.delayCounter--;
    if (this.delayCounter === 0) {
      this.step = this.stepHolder;
      delete this.stepHolder;
    }
  };
}

var makeLissajousTracer = function() {
  clearActive();
  var newDancer = new LissajousTracer(
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  );
  newDancer.$node.addClass("active");
  currentActive = newDancer;
  return newDancer;
}