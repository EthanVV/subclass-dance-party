var RainbowBouncer = function(top, left, velocity, startingHue) {
  //this.oldStep = Dancer.prototype.step;
  
  Dancer.call(this, top, left, 20);
  this.velocity = velocity;
  this.changeColor(startingHue);
};

RainbowBouncer.prototype = Object.create(Dancer.prototype);
RainbowBouncer.prototype.constructor = RainbowBouncer;

RainbowBouncer.prototype.step = function() {
  this.oldStep();
  var currentPosition = this.getPosition();
  currentPosition.top += this.velocity.top;
  currentPosition.left += this.velocity.left;
  this.setPosition(currentPosition.top, currentPosition.left);
  this.checkBounce(currentPosition);
};

RainbowBouncer.prototype.changeColor = function(hue) {
  $(this.$node).css({'border-color': 'hsl(' + hue + ', 100%, 50%'});
};

RainbowBouncer.prototype.checkBounce = function(position) {
  if (position.top < 0 && this.velocity.top < 0) {
    this.velocity.top *= -1;
    this.changeColor(Math.floor(360 * Math.random()));
  } else if (position.top > $("body").height() - 20 && this.velocity.top > 0) {
    this.velocity.top *= -1;
    this.changeColor(Math.floor(360 * Math.random()));
  }
  if (position.left < 0 && this.velocity.left < 0) {
    this.velocity.left *= -1;
    this.changeColor(Math.floor(360 * Math.random()));
  } else if (position.left > $("body").width() - 20 && this.velocity.left > 0) {
    this.velocity.left *= -1;
    this.changeColor(Math.floor(360 * Math.random()));
  }
};

var makeRainbowBouncer = function() {
  clearActive();
  var newDancer = new RainbowBouncer(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      {left: 1 + (Math.random() * 19), top: 1 + (Math.random() * 19)},
      Math.floor(360 * Math.random()),
    );
  newDancer.$node.addClass("active");
  currentActive = newDancer;
  return newDancer;
};