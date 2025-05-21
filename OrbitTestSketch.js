let points;

function preload() {
  points = loadJSON("orbits.json");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");
  background(255);
  noLoop(); //don't need to loop in this test because just rendering the orbit paths, not the planets.
  //frameRate(30);

  planets = Object.keys(points); // Get the keys of all the frames in JSON
}

function draw() {
  background(255);
  fill(0, 100, 200);
  noStroke();

  // Highest level JSON grouping is each planet name, which then has a dictionary with "x" and "y", which each are an array of values.

  testPoints = points[planets[0]];

    for (let i= 0; i < testPoints["x"].length; i++)
    {

        ellipse(
        map(testPoints["x"][i], -62, 62, 0, width),
        map(testPoints["y"][i], -62/(9/5), 62/(9/5), 0, height),
        10,
        10
        );
    }

}