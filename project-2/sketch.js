let flakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke();

  for (let i = 0; i < 200; i++) {
    flakes.push({
      x: random(width),
      y: random(height),
      size: random(2, 6),
      speed: random(0.5, 2),
    });
  }
}

function draw() {
  background(0);
  fill(255);

  for (let f of flakes) {
    circle(f.x, f.y, f.size);
    f.y += f.speed;

    // when a flake falls off the bottom, put it back at the top
    if (f.y > height) {
      f.y = 0;
      f.x = random(width);
    }
  }
   
}
