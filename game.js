// Matching Game Sequence to Player Sequence
// press any key to start. Event listeners will be waiting on a keypress to start
// increment a level up every time successful user pattern is matched to random pattern set by game

let gameSequence = [];
let playerSequence = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStart = false;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playerSequence.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(playerSequence.length - 1);
});

$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

function checkAnswer(currentLevel) {
  if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
    console.log("success");
    if (playerSequence.length === gameSequence.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gameSequence = [];
  gameStart = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  playerSequence = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gameSequence.push(randomChosenColour); //random colour has been added to gameSequence empty array
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"), 100
  });
}
