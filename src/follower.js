var Follower = function(directLeader) {
  Dancer.call(this, -30, -30, 0);
  this.directLeader = directLeader;
  directLeader.directFollower = this;
  this.$node.addClass("follower");
}

Follower.prototype = Object.create(Dancer.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.step = function() {
  var index = this.directLeader.stepHistory.currentIndex - 10;
  if (index < 0) {
    index += 100;
  }
  var targetPosition = this.directLeader.stepHistory[index];
  this.$node.css("border-color", targetPosition.color);
  this.setPosition(targetPosition.top, targetPosition.left);
  if(this.directFollower !== null) {
    this.directFollower.step();
  }
}

var makeFollower = function() {
  if (currentActive && !window.isLinedUp) {
    var currentLeader = currentActive;
    while(currentLeader.directFollower !== null) {
      currentLeader = currentLeader.directFollower;
    }
    var newFollower = new Follower(currentLeader);
    return newFollower;
  }
}