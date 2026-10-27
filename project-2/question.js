let paddleLeftX = 20;
let paddleLeftY = 200;

let paddleRightX = 380;
let paddleRightY = 200;

let paddleSpeed = 2;
let paddleHeight = 80;
let paddleWidth = 10;

let leftScore = 0;
let rightScore = 0;

let ballPosX = 200;
let ballPosY = 200;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballSize = 10;

// Win tracking
let winScore = 5;       // goals needed to unlock .question
let fadeTime = 2000;    // ms the canvas takes to fade out
let revealDelay = 2500; // ms before .question appears (keep longer than fadeTime)
let unlocked = false;

function setup() {
  createCanvas(400, 400);

  rectMode(CENTER);
  fill(255);
  noStroke();
  textSize(40);
  textAlign(CENTER);

  noLoop();
  describe(
    'Two narrow white rectangles and a white square representing the paddles and ball in a game of ping pong. The player scores are displayed in the upper corners, and initially text reads "Click to start"'
  );
}

function draw() {
  background(0);

  // Paddles and ball
  rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);
  rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);
  square(ballPosX, ballPosY, ballSize);

  // Scores
  text(leftScore, width * 0.25, height * 0.1);
  text(rightScore, width * 0.75, height * 0.1);

  // Move the ball
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Left paddle collision
  let leftCollisionLeft = paddleLeftX - paddleWidth / 2 - ballSize / 2;
  let leftCollisionRight = paddleLeftX + paddleWidth / 2 + ballSize / 2;
  let leftCollisionTop = paddleLeftY - paddleHeight / 2 - ballSize / 2;
  let leftCollisionBottom = paddleLeftY + paddleHeight / 2 + ballSize / 2;

  if (
    ballPosX >= leftCollisionLeft &&
    ballPosX <= leftCollisionRight &&
    ballPosY >= leftCollisionTop &&
    ballPosY <= leftCollisionBottom
  ) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (ballPosY - paddleLeftY) / 20;
  }

  // Right paddle collision
  let rightCollisionLeft = paddleRightX - paddleWidth / 2 - ballSize / 2;
  let rightCollisionRight = paddleRightX + paddleWidth / 2 + ballSize / 2;
  let rightCollisionTop = paddleRightY - paddleHeight / 2 - ballSize / 2;
  let rightCollisionBottom = paddleRightY + paddleHeight / 2 + ballSize / 2;

  if (
    ballPosX >= rightCollisionLeft &&
    ballPosX <= rightCollisionRight &&
    ballPosY >= rightCollisionTop &&
    ballPosY <= rightCollisionBottom
  ) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (ballPosY - paddleRightY) / 20;
  }

  // Scoring and wall bounces
  if (ballPosX < 0) {
    awardPoint('right');
    resetBall();
  } else if (ballPosX > width) {
    awardPoint('left');
    resetBall();
  } else if (ballPosY < 0 || ballPosY > height) {
    ballSpeedY = -ballSpeedY;
  }

  // Left paddle: W / S
  let leftMove = 0;
  if (keyIsDown('KeyS')) leftMove += paddleSpeed;
  if (keyIsDown('KeyW')) leftMove -= paddleSpeed;

  paddleLeftY = constrain(
    paddleLeftY + leftMove,
    paddleHeight / 2,
    height - paddleHeight / 2
  );

  // Right paddle: arrow keys
  let rightMove = 0;
  if (keyIsDown(DOWN_ARROW)) rightMove += paddleSpeed;
  if (keyIsDown(UP_ARROW)) rightMove -= paddleSpeed;

  paddleRightY = constrain(
    paddleRightY + rightMove,
    paddleHeight / 2,
    height - paddleHeight / 2
  );

  // Start prompt
  if (isLooping() === false && !unlocked) {
    text('Click to start', width / 2, height / 2 - 20);
  }
}

// Adds a point and unlocks .question once someone reaches winScore
function awardPoint(side) {
  if (side === 'left') {
    leftScore += 1;
  } else {
    rightScore += 1;
  }

  if ((leftScore >= winScore || rightScore >= winScore) && !unlocked) {
    unlocked = true;
    fadeOutGame();
    setTimeout(revealQuestion, revealDelay);
  }
}

// Fades the canvas out, then stops the game and removes the canvas from layout
function fadeOutGame() {
  let c = document.querySelector('canvas');
  c.style.transition = 'opacity ' + fadeTime / 1000 + 's ease';
  c.style.opacity = '0';

  setTimeout(() => {
    noLoop();
    c.style.display = 'none';
  }, fadeTime);
}

// Shows the .question element from the page
function revealQuestion() {
  let q = document.querySelector('.question');
  if (q) {
    q.classList.remove('hidden');
  }
}

function resetBall() {
  ballPosX = width / 2;
  ballPosY = height / 2;
  ballSpeedX = random([-3, 3]);
  ballSpeedY = random([-1, 1]);
}

function mousePressed() {
  if (isLooping() === false && !unlocked) {
    resetBall();
    loop();
  }
}