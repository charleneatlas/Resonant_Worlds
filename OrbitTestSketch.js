// For orbit paths
let orbitPathPoints;
//var planets;

let staticLayer;
let staticOrbitLayers = {}; // To improve performance, we will store a graphics layer for each pair combination of orbits and the default option of all orbits.
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

    // Create a static graphic layer for each pair of planets and the option of all planets, that can be chosen to be drawn.
    createOrbitLayers();

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
      window.sharedData.updateOrbits = false;
    }
    if (Object.keys(staticOrbitLayers).length > 0) {
      console.log(
        "Drawing static orbits for: " +
          window.sharedData.selectedPlanets.join("")
      );
      p.image(
        staticOrbitLayers[window.sharedData.selectedPlanets.join("")], // Get correct layer for selected planet pair
        0,
        0
      );
    }

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

  function setupStaticOrbitLayer() {
    let sLayer;
    sLayer = p.createGraphics(720, 400);
    sLayer.clear();
    sLayer.fill(0, 100, 200);
    sLayer.noStroke();
    return sLayer;
  }

  function createOrbitLayers() {
    let planetPairs = Object.keys(window.sharedData.ratios);
    //console.log(planetPairs);

    for (const pPair of planetPairs) {
      // Set up static layer for orbits
      let sLayer = setupStaticOrbitLayer();

      drawOrbits(pPair.split(""), pPair, sLayer);
    }

    // Add on one more static layer for when all planets selected
    let sLayer;
    sLayer = setupStaticOrbitLayer();

    drawOrbits(
      Object.keys(orbitPathPoints),
      Object.keys(orbitPathPoints).join(""),
      sLayer
    ); //send all the planets, which are keys of this array
  }

  function drawOrbits(planets, pPair, sLayer) {
    // Highest level JSON grouping is each planet name, which then has a dictionary of XY tuples.
    let allPoints = planets.flatMap((pl) => orbitPathPoints[pl]);

    for (let i = 0; i < allPoints.length; i++) {
      let [x, y] = allPoints[i];

      sLayer.ellipse(
        p.map(x, -62, 62, 0, p.width),
        p.map(y, -62 / (9 / 5), 62 / (9 / 5), 0, p.height),
        2,
        2
      );
    }
    staticOrbitLayers[pPair] = sLayer;
  }

  function drawPlanets() {
    // for each frame, get keys (which will be planet names), for each one there is an array of tuples

    for (const planet in frames[frameIndex]) {
      for (const [x, y] of frames[frameIndex][planet]) {
        if (window.sharedData.selectedPlanets.includes(planet)) {
          // only draw planet if selected
          animationLayer.ellipse(
            p.map(x, -62, 62, 0, p.width),
            p.map(y, -62 / (9 / 5), 62 / (9 / 5), 0, p.height),
            8,
            8
          );
        }
      }
    }

    frameIndex = (frameIndex + 1) % frames.length;
    //print(frameIndex);
  }
};
new p5(mainSketch);
