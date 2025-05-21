let points;
var backgroundImg;

function preload() {
  points = loadJSON("orbits.json");
  backgroundImg = loadImage('plot_bg_animation_slim.png');
}

function setup() {
  let canvas = createCanvas(720, 400);
  canvas.parent("sketch-container");
  
  noLoop(); //don't need to loop in this test because just rendering the orbit paths, not the planets.
  //frameRate(30);

  planets = Object.keys(points); // Get the keys of all the frames in JSON
}

function draw() {
  background(backgroundImg);
  fill(0, 100, 200);
  noStroke();

  // Highest level JSON grouping is each planet name, which then has a dictionary of XY tuples.

    for(let i = 0; i < planets.length; i++)
    {
        for (const [x,y] of points[planets[i]])
    {

        ellipse(
        map(x, -62, 62, 0, width),
        map(y, -62/(9/5), 62/(9/5), 0, height),
        2,
        2
        );
    }
    }

}