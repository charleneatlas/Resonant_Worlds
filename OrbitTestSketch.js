// For orbit paths
let orbitPathPoints;
//var planets;

let staticLayer;
var backgroundImg;

// For planet positions
let planetPositions; // loaded position data from JSON
let frameIndex = 0;
let frames = [];
let frameDelay = 0; // frames to wait before advancing
let timer = 0;

const mainSketch = (p) => {
  // Grab the data and images
  p.preload = () => {
    orbitPathPoints = p.loadJSON("orbits.json");
    planetPositions = p.loadJSON("planetFrames.json");
    backgroundImg = p.loadImage("plot_bg_animation_slim_Small.png");
  };

  p.setup = () => {
    let canvas = p.createCanvas(720, 400);
    canvas.parent("sketch-container");

    p.fill(0, 100, 200);
    // Set up static layer for orbits
    staticLayer = p.createGraphics(720, 400);
    staticLayer.clear();
    staticLayer.fill(0, 100, 200);
    staticLayer.noStroke();
    planets = Object.keys(orbitPathPoints); // Get the keys of all the frames in JSON, which are the planet names (e.g. "b", "c")
    drawOrbits(planets);

    // Set up animated layer for planets
    animationLayer = p.createGraphics(720, 400);

    //noLoop();
    p.frameRate(90);
    frames = planetPositions["frames"];
  };

  p.draw = () => {
    // Draw static background image
    p.image(backgroundImg, 0, 0);

    // Draw static layer for orbits, and only update drawing the orbit points if new set of planets selected
    if (window.sharedData.updateOrbits) {
      staticLayer.clear();
      drawOrbits(window.sharedData.selectedPlanets);
      window.sharedData.updateOrbits = false;
    }
    p.image(staticLayer, 0, 0);

    //Clear and Draw animated layer
    animationLayer.clear();
    animationLayer.noStroke();
    animationLayer.fill(0, 255, 0);
    animationLayer.noSmooth(); // Turns off anti-aliasing to improve performance
    drawPlanets();
    p.image(animationLayer, 0, 0);

    //FPS counter display
    p.text(p.nf(p.frameRate(), 2, 1), 10, 20);
  };

  function drawOrbits(planets) {
    // Highest level JSON grouping is each planet name, which then has a dictionary of XY tuples.

    let allPoints = planets.flatMap((pl) => orbitPathPoints[pl]);

    for (let i = 0; i < allPoints.length; i++) {
      let [x, y] = allPoints[i];

      staticLayer.ellipse(
        p.map(x, -62, 62, 0, p.width),
        p.map(y, -62 / (9 / 5), 62 / (9 / 5), 0, p.height),
        2,
        2
      );
    }
  }

  function drawPlanets() {
    // for each frame, get keys (which will be planet names), for each one there is an array of tuples

    for (const planet in frames[frameIndex]) {
      for (const [x, y] of frames[frameIndex][planet]) {
        if (window.sharedData.selectedPlanets.includes(planet)) {
          animationLayer.ellipse(
            p.map(x, -62, 62, 0, p.width),
            p.map(y, -62 / (9 / 5), 62 / (9 / 5), 0, p.height),
            8,
            8
          );
        }

        //print("X:" + x + " Y:" + y);
        //print(frameIndex);
      }
    }

    frameIndex = (frameIndex + 1) % frames.length;
    //print(frameIndex);
  }
};
new p5(mainSketch);
