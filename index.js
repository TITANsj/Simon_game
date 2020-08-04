var buttonColors = ["red", "yellow", "green", "blue"];
var userPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userClicked = $(this).attr("id");
  userPattern.push(userClicked);
  animatePress(userClicked);
  playSound(userClicked);
  checkAnswer(userPattern.length-1);
});

function nextSequence(){
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(gamePattern.length === userPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}

function playSound(currentSound){
  var audio = new Audio("sounds/" + currentSound + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
