// --Sketch--
let highScore = 0;
let myYPos = 334; // changes when player jumps
let enemyXPos = 400; // changes when obstacles move across the screen
const myXPos = 65;
const enemyYPos = 344;

// collision variables
let enemySize = 30;
let myRight, myTop, myBottom, myLeft;
let enemyLeft, enemyTop, enemyBottom, enemyRight;

// jumping variables
let ySpeed;
let isJumping = false;
const gravity = 1.4;

// tracks score
let score = 0;
let message = "Score: ";

// game state variables
let isGameStarted = false;
let isGameOver = false;

// initializes game
function startGame() {
  enemyXPos = 525; 
  score = 0
  ySpeed = 0;
  isJumping = false;
  isGameOver = false;
  highScore = localStorage.getItem("highScore") || 0;
  loop();
}

function setup() {
  var canvas = createCanvas(500, 500);
  background(222, 222, 222);

  // Moves canvas so it’s inside div.
  canvas.parent('sketch-holder');

  rectMode(CENTER);
}

function draw() {
  background(222, 222, 222);

  line(0, 360, 500, 360); //sets ground

  if (!isGameStarted) {
    displayStartMessage();
    fill(255,255,255)
    rect(myXPos, myYPos, 50, 50); // adds player to background
  }
  else if (!isGameOver) {
    rect(myXPos, myYPos, 50, 50); // creates player
    rect(enemyXPos, enemyYPos, enemySize, enemySize); // creates enemy

    // Player jumps
    if ((keyIsDown(UP_ARROW) || keyIsDown(32)) && !isJumping) {
      ySpeed = -20; // jumping height
      isJumping = true;
    }

    // applies gravity
    myYPos += ySpeed; // adds ySpeed (-20) to myYPos
    ySpeed += gravity; // increments ySpeed by 2 until it reaches the ground

    // to check if player touches the ground
    if (myYPos > 334) {
      myYPos = 334;
      isJumping = false;
    }

    // collision detection
    myLeft = myXPos - 25;
    myRight = myXPos + 25;
    myTop = myYPos - 25;
    myBottom = myYPos + 25;

    enemyLeft = enemyXPos - 15;
    enemyRight = enemyXPos + 15;
    enemyTop = enemyYPos - 15;
    enemyBottom = enemyYPos + 15;

    // moves enemy object across the screen
    enemyXPos -= 5; 
    // resets enemy position when it goes off the screen
    if (enemyLeft < 10   ) {
      enemyXPos = 525;
    }

   // non-collision
  if (myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop) {
    // updates score when player passes enemy without colliding
    if (myLeft > enemyRight) {
      score += 1;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
  } 
  else {
    // collision occurred, game ends
    isGameOver = true;
    noLoop();
    displayGameOverMessage();
    }
      // displays score message
      fill(255, 255, 255);
      textSize(30);
      textAlign(RIGHT);
      text(message + score, 485, 60);
  }
  }

function keyPressed() {
  if (keyCode === 32) {
    if (!isGameStarted) {
      // starts game when space bar is pressed
      isGameStarted = true;
      startGame();
    } else if (isGameOver) {
      // restarts game when space bar is pressed after a game over
      isGameOver = false;
      startGame(); 
    }
  }
  }

function displayStartMessage() {
  fill(0, 0, 255); 
  textSize(30);
  textAlign(CENTER);
  text("Press Space to Start", 250, 250);
}

function displayGameOverMessage() {
  fill(255, 0, 0); 
  textSize(30);
  textAlign(CENTER);
  text("Game Over\nHigh Score: " + highScore, 250, 250);
}

// --User button--
let button = document.getElementById("user");
function setUserName() {
    let userInput = prompt("Enter username:");
    if (userInput == null || userInput == ""){
    }
    else{ 
    button.innerHTML = userInput;  
    //saves the username
    localStorage.setItem("username", userInput);
    }
    //removes focus from button
    button.blur();
}
// Saves username after page reloads
window.onload = function() {
    let savedUsername = localStorage.getItem("username");
    button.innerHTML = savedUsername;
}
