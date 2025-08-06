const sketch = (p) => {
  const n = 6;
  const radius = 200;
  const pointRadius = 10;
  const labels = ["b", "c", "d", "e", "f", "g"];
  const ratios = {
    bc: "3:2",
    bd: "9:4",
    be: "27:8",
    bf: "9:2",
    bg: "6:1",

    cd: "3:2",
    ce: "9:4",
    cf: "3:1",
    cg: "4:1",

    de: "3:2",
    df: "2:1",
    dg: "8:3",

    ef: "4:3",
    eg: "16:9",

    fg: "4:3",
  };
  let points = [];
  let hoveredLine = null;
  let hoveredPlanets = ""; //will be a concatenated string of the two planet names, e.g. "be"

  p.setup = () => {
    p.createCanvas(720, 400);

    let rotationOffset = -p.PI; // Rotate by X degrees

    for (let i = 0; i < n; i++) {
      let angle = (p.TWO_PI * i) / n - rotationOffset;
      let x = radius * p.cos(angle) + p.width / 2;
      let y = radius * p.sin(angle) + p.height / 2;
      points.push(p.createVector(x, y));
    }
  };

  p.draw = () => {
    p.background(255);
    hoveredLine = null;
    const hoverThreshold = 5;

    // Detect hovered line
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const pt1 = points[i];
        const pt2 = points[j];
        if (
          pointNearLine(
            p.mouseX,
            p.mouseY,
            pt1.x,
            pt1.y,
            pt2.x,
            pt2.y,
            hoverThreshold
          )
        ) {
          hoveredLine = { i, j };
        }
      }
    }

    // Draw all lines
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const pt1 = points[i];
        const pt2 = points[j];
        if (hoveredLine && hoveredLine.i === i && hoveredLine.j === j) {
          p.stroke(0, 100, 200);
          p.strokeWeight(6);
        } else {
          p.stroke(150);
          p.strokeWeight(3);
        }
        p.line(pt1.x, pt1.y, pt2.x, pt2.y);
      }
    }

    // Draw points and labels
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    for (let i = 0; i < n; i++) {
      const pt = points[i];
      p.circle(pt.x, pt.y, pointRadius * 2);
      p.textFont("Arial", 30);
      p.text(labels[i], pt.x - 15, pt.y - 15);
    }

    // Draw tooltip if hovering a line
    if (hoveredLine) {
      const pt1 = points[hoveredLine.i];
      const pt2 = points[hoveredLine.j];
      const midX = (pt1.x + pt2.x) / 2;
      const midY = (pt1.y + pt2.y) / 2;

      const label1 = labels[hoveredLine.i];
      const label2 = labels[hoveredLine.j];
      const lineRatio = ratios[label1 + label2];
      const tooltipText = `${label1}:${label2} = ${lineRatio}`;

      // Draw tooltip background
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(1);
      p.rectMode(p.CENTER);
      p.rect(midX, midY - 20, p.textWidth(tooltipText) + 10, 24, 5);

      // Draw tooltip text
      p.fill(0);
      p.noStroke();
      p.textFont("Arial", 20);
      p.text(tooltipText, midX, midY - 20);

      // Update shared data with main sketch to indicate selected planets
      if (hoveredPlanets != label1 + label2) {
        // Check if a hover has just started
        hoveredPlanets = label1 + label2;
        window.sharedData.selectedPlanets = hoveredPlanets.split("");
        window.sharedData.updateOrbits = true;
        console.log("hover start");
      }
    } else {
      if (
        !window.sharedData.updateOrbits &&
        window.sharedData.selectedPlanets != window.sharedData.allPlanets
      ) {
        window.sharedData.selectedPlanets = window.sharedData.allPlanets;
        window.sharedData.updateOrbits = true;
      }
    }
  };

  function pointNearLine(px, py, x1, y1, x2, y2, threshold) {
    return distToSegment(px, py, x1, y1, x2, y2) < threshold;
  }

  function distToSegment(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return p.dist(px, py, x1, y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = p.constrain(t, 0, 1);
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);
    return p.dist(px, py, projX, projY);
  }
};

new p5(sketch);
