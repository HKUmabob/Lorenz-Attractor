let x = 0.01;
let y = 0;
let z = 0;

let p = 28;
let s = 10;
let b = 8/3;
let h = 0.01;

let points = [];
let increment = 1.5;

var easycam;
let dropdown;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  translate(width/2, height/2);
  strokeWeight(5);
  colorMode(HSB);
  easycam = createEasyCam();
  setAttributes('antialias', true);

  points.push(createVector(x, y, z));

  dropdown = createSelect();
  dropdown.position(10, 10);
  dropdown.option('Single Point');
  dropdown.option('3 Trails');
  dropdown.option('Many Point');
  dropdown.changed(chnageMode);

  background(0);

}                                                              

function draw() {
  scale(5);
  background(0);
  rk4Lorenz();

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

function Xfunc(x, y){
  return (s*(y-x));
}

function Yfunc(x, y, z){
  return (x*(p-z)-y);
}

function Zfunc(x, y, z){
  return (x*y-b*z)
}

function rk4Lorenz(){
  let preX = points[points.length-1].x;
  let preY = points[points.length-1].y;
  let preZ = points[points.length-1].z;

  let k1x = Xfunc(preX, preY);
  let k1y = Yfunc(preX, preY, preZ);
  let k1z = Zfunc(preX, preY, preZ);

  let k2x = Xfunc(preX + k1x * (h/2), preY + k1y * (h/2));
  let k2y = Yfunc(preX + k1x * (h/2), preY + k1y * (h/2), preZ + k1z * (h/2));
  let k2z = Zfunc(preX + k1x * (h/2), preY + k1y * (h/2), preZ + k1z * (h/2));

  let k3x = Xfunc(preX + k2x * (h/2), preY + k2y * (h/2));
  let k3y = Yfunc(preX + k2x * (h/2), preY + k2y * (h/2), preZ + k2z * (h/2));
  let k3z = Zfunc(preX + k2x * (h/2), preY + k2y * (h/2), preZ + k2z * (h/2));

  let k4x = Xfunc(preX + k3x * h, preY + k3y * h);
  let k4y = Yfunc(preX + k3x * h, preY + k3y * h, preZ + k3z * h);
  let k4z = Zfunc(preX + k3x * h, preY + k3y * h, preZ + k3z * h);

  let nextX = preX + (h/6) * (k1x + 2 * k2x + 2* k3x + k4x);
  let nextY = preY + (h/6) * (k1y + 2 * k2y + 2* k3y + k4y);
  let nextZ = preZ + (h/6) * (k1z + 2 * k2z + 2* k3z + k4z);

  points.push(createVector(nextX, nextY, nextZ))


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function chnageMode(){
  dropdown.remove();
  points = [];
  setup();
}