new p5((p) => {
  let spots = [
    { x: 300, y: 100 },
  { x: 300, y: 300 },
  { x: 300, y: 500 },
  { x: 200, y: 200 },
  { x: 400, y: 400 },
  { x: 100, y: 80 },
  { x: 150, y: 350 },
  { x: 120, y: 600 },
  { x: 500, y: 150 },
  { x: 550, y: 320 },
  { x: 480, y: 580 },
  { x: 700, y: 100 },
  { x: 750, y: 250 },
  { x: 650, y: 450 },
  { x: 720, y: 620 },
  { x: 900, y: 180 },
  { x: 950, y: 380 },
  { x: 880, y: 540 },
  { x: 1050, y: 120 },
  { x: 1100, y: 300 },
  { x: 1000, y: 500 },
  { x: 1150, y: 620 },
  ];

  p.setup = () => {
    let c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.parent("lost");
    p.textSize(24);
    p.frameRate(2);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(0);
    if (p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY) {
      let spot = p.random(spots);
      p.fill(p.random(255), p.random(255), p.random(255));
      p.text("Don't Follow Me. I'm Lost Too.", spot.x, spot.y);
    }
  };
})