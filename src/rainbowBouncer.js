var RainbowBouncer = function(top, left, velocity, startingHue) {
  //this.oldStep = Dancer.prototype.step;
  Dancer.call(this, top, left, 10);
  this.changeColor(startingHue);
  this.velocity = velocity;
};

RainbowBouncer.prototype = Object.create(Dancer.prototype);
RainbowBouncer.prototype.constructor = RainbowBouncer;

RainbowBouncer.prototype.step = function() {
};

RainbowBouncer.prototype.changeColor = function(hue) {
  $(this.$node).css({'border-color': 'hsl(' + hue + ', 100%, 50%'});
};

RainbowBouncer.prototype.bounce = function(wall) {
};

var makeRainbowBouncer = function() {
  var newDancer = new RainbowBouncer(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      0,
      Math.floor(360 * Math.random()),
    );
  return newDancer;
};