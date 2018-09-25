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
    if (dancer) {
      window.dancers.push(dancer);
      $('body').append(dancer.$node);
    }

  });
  
  $('.lineupButton').on('click', function(event) {
    if (!window.isLinedUp) {
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
      window.isLinedUp = true;
    }
  });

  $('.breakLineButton').on('click', function(event) {
    if (window.isLinedUp) {
      for (var i = 0; i < window.dancers.length; i++) {
        var currentDancer = window.dancers[i];
        currentDancer.breakLine();
      }
    window.isLinedUp = false;
    }
  });

  $('.activeCycler').on('click', function(event) {
    if (dancers.length > 0 && !isLinedUp){
      var activeIndex;
      if (currentActive === null) {
        activeIndex = 0;
      } else {
        for(var i = 0; i < dancers.length && activeIndex === undefined; i++) {
          if (currentActive === dancers[i]) {
            activeIndex = i + 1;
          }
        }
      }
      var newIndex;
      for (var i = activeIndex; i < dancers.length && newIndex === undefined; i++) {
        if (dancers[i].$node.hasClass("head")) {
          newIndex = i;
        }
      }
      clearActive();
      if (newIndex !== undefined) {
        currentActive = dancers[newIndex];
        currentActive.$node.addClass("active");
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