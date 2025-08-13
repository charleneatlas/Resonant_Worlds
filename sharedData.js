// Data shared between main sketch and UI sketch
window.sharedData = {
  selectedPlanets: [],
  updateOrbits: false,
  allPlanets: ["b", "c", "d", "e", "f", "g"],
  ratios: {
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
  },
};
