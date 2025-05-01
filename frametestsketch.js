let positions; // loaded position data from JSON
let frameIndex = 0;
let frameKeys = [];
let frameDelay = 15; // frames to wait before advancing
let timer = 0;

function preload() {
  positions = loadJSON("frametest.json");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");
  background(255);
  //noLoop();
  frameRate(30);

  frameKeys = Object.keys(positions.frames); // Get the keys of all the frames in JSON
}

function draw() {
  background(255);
  fill(0, 100, 200);
  noStroke();

  // Highest level JSON grouping is frames, which is an array of planets.
  let currentFrame = positions.frames[frameKeys[frameIndex]];

  for (let [planetID, pos] of Object.entries(currentFrame)) {
    // Each planet is a key value pair of planet id and xy postition.
    //print(planetID, pos.x, pos.y);

    //let x = map(pos.x, 0, 100, 20, width - 20);
    //let y = map(pos.y, 0, 100, height - 20, 20);

    ellipse(
      map(pos.x, 0, 100, 0, width),
      map(pos.y, 0, 100, 0, height),
      10,
      10
    );
    textSize(12);
    fill(0, 100, 200);
  }

  timer++;
  if (timer % frameDelay === 0) {
    frameIndex = (frameIndex + 1) % frameKeys.length;
  }
}
