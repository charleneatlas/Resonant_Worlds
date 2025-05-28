// For orbit paths
let orbitPathPoints;
//let planetOrbits;
var backgroundImg;

// For planet positions
let planetPositions; // loaded position data from JSON
let frameIndex = 0;
let frames = [];
let frameDelay = 15; // frames to wait before advancing
let timer = 0;

// Grab the data and images
function preload() {
  orbitPathPoints = loadJSON("orbits.json");
  planetPositions = loadJSON("planetFrames.json");
  backgroundImg = loadImage("plot_bg_animation_slim.png");
}

function setup() {
  let canvas = createCanvas(720, 400);
  canvas.parent("sketch-container");

  //noLoop(); //don't need to loop in this test because just rendering the orbit paths, not the planets.
  //frameRate(30);

  planets = Object.keys(orbitPathPoints); // Get the keys of all the frames in JSON
  frames = planetPositions["frames"];
}

function draw() {
  background(backgroundImg);
  fill(0, 100, 200);
  noStroke();

  drawOrbits();

  push();

  fill(0, 255, 0);
  drawPlanets();

  pop();
}

function drawOrbits() {
  // Highest level JSON grouping is each planet name, which then has a dictionary of XY tuples.

  for (let i = 0; i < planets.length; i++) {
    for (const [x, y] of orbitPathPoints[planets[i]]) {
      ellipse(
        map(x, -62, 62, 0, width),
        map(y, -62 / (9 / 5), 62 / (9 / 5), 0, height),
        2,
        2
      );
    }
  }
}

function drawPlanets() {
  // for each frame, get keys (which will be planet names), for each one there is an array of tuples

  for (const planet in frames[0]) {
    for (const [x, y] of frames[0][planet]) {
      ellipse(
        map(x, -62, 62, 0, width),
        map(y, -62 / (9 / 5), 62 / (9 / 5), 0, height),
        8,
        8
      );

      //print("X:" + x + " Y:" + y);
    }
  }
}
