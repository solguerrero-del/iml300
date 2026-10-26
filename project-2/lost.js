let spots = [
  { x: 300, y: 100 },
  { x: 300, y: 300 },
  { x: 300, y: 500 },
  { x: 200, y: 200 },
  { x: 400, y: 400 },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  frameRate(2);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    let spot = random(spots);
    fill(random(255), random(255), random(255));
    text("Don't Follow Me. I'm Lost Too.", spot.x, spot.y);
  }
}