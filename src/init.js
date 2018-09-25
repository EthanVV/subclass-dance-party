$(document).ready(function() {
  window.dancers = [];
  window.currentActive = null;

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = dancerMakerFunction();
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });
  
  $('.lineupButton').on('click', function(event) {
    var numHeads = 0;
    for (var i = 0; i < window.dancers.length; i++) {
      var currentDancer = window.dancers[i];
      if (currentDancer.$node.hasClass("follower")) {
        var leaderTargetPos = currentDancer.directLeader.linePosition;
        currentDancer.lineUp({top:leaderTargetPos.top + 30, left:leaderTargetPos.left});
        
      } else {
        currentDancer.lineUp({top:50, left:50 + 30 * numHeads});
        numHeads++;
      }
    }
  });
});

var clearActive = function() {
  window.currentActive = null;
  for(var i = 0; i < window.dancers.length; i++) {
    window.dancers[i].$node.removeClass("active");
  }
}