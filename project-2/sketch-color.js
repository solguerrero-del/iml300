// Same as sketch.js, but the snow turns into colorful circles.
let flakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke();
  // HSB: hue (0-360), saturation (0-100), brightness (0-100)
  colorMode(HSB);

  for (let i = 0; i < 200; i++) {
    flakes.push({
      x: random(width),
      y: random(height),
      size: random(2, 6),
      speed: random(0.5, 2),
      color: color(random(360), 60, 100),
    });
  }
}

function draw() {
  background(0);

  for (let f of flakes) {
    fill(f.color);
    circle(f.x, f.y, f.size);
    f.y += f.speed;

    // when a flake falls off the bottom, put it back at the top
    if (f.y > height) {
      f.y = 0;
      f.x = random(width);
    }
  }

}
