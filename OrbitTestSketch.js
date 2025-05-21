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

  // Highest level JSON grouping is each planet name, which then has a dictionary of XY tuples.

  testPoints = points[planets[0]];

    for (const [x,y] of testPoints)
    {

        ellipse(
        map(x, -62, 62, 0, width),
        map(y, -62/(9/5), 62/(9/5), 0, height),
        10,
        10
        );
    }

}