let x = 0.01;
let y = 0;
let z = 0;

let p = 28;
let s = 10;
let b = 8/3;
let dt = 0.01;

let points = [];
let increment = 1.5;

var easycam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  translate(width/2, height/2);
  strokeWeight(1);
  colorMode(HSB);
  easycam = createEasyCam();
  setAttributes('antialias', true);
}                                                              

function draw() {
  scale(5);
  background(0);
  let dx = (s*(y-x))*dt;
  let dy = (x*(p-z)-y)*dt;
  let dz = (x*y-b*z)*dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;
  points.push(createVector(x, y, z));

  let hue  = 0;
  for (let p of points) {
    stroke(hue, 255, 255);
    point(p.x, p.y, p.z);
    if (hue === 255) {
      increment = -1.5;
    } else if (hue === 0) {
      increment = 1.5;
    }
  
    hue += increment;
  }

}

function keyPressed() {
  if (key == 'a'){
    saveCanvas("lorez_atrractor", 'jpg');
  }
}