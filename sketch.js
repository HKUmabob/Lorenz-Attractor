let x = 0.01;
let y = 0;
let z = 0;

const p = 28;
const s = 10;
const b = 8 / 3;
const h = 0.01;

const critical_x1 = Math.sqrt(b*(p - 1));
const critical_y1 = critical_x1;
const critical_z1 = (p - 1);
const critical_x2 = (critical_x1 * (-1));
const critical_y2 = critical_x2;
const critical_z2 =critical_z1;

let points = [];
let increment = 1.5;

var easycam;
let dropdown;
let currentMode;
let show_critical = false;


let singlePointMode;
let threeTrailsMode;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	translate(width / 2, height / 2);
	colorMode(HSB);
	setAttributes('antialias', true);
	
	singlePointMode = new SinglePointMode();
	threeTrailsMode = new ThreeTailsMode();
	singlePointMode.init();
	threeTrailsMode.init();

	dropdown = createSelect();
	dropdown.position(10, 10);
	dropdown.option('Select a mode to draw');
	dropdown.option('Single Point');
	dropdown.option('3 Trails');
	dropdown.option('Many Point');
	dropdown.changed(chnageMode);
	console.log(p5.Vector.lerp(
		createVector(critical_x1, critical_y1, critical_z1),
		createVector(critical_x2, critical_y2, critical_z2),
		0.5
	));
	easycam = createEasyCam();

}

function draw() {
	background(0);

	drawSelectedMode();

	if (show_critical) {
		drawCritical();
	}


	//frameRate(120);
}

function keyPressed() {
	if (key == 'a') {
		saveCanvas("lorez_atrractor", 'jpg');
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function chnageMode() {
	currentMode = dropdown.value();
	console.log(dropdown.value())

	singlePointMode.init();
	threeTrailsMode.init();
}

function drawSelectedMode(){
	if (currentMode === 'Single Point'){
		singlePointMode.updateDraw();
		
	} else if (currentMode === '3 Trails'){
		threeTrailsMode.updateTrails();

	} else if (currentMode === 'Many Point'){

	}
}

function drawCritical() {
	push();
	noStroke();
	fill(255);

	push();
	translate(critical_x1, critical_y1, critical_z1);
	sphere(1);
	pop();

	push();
	translate(critical_x2, critical_y2, critical_z2);
	sphere(1);
	pop();

	pop()
}

function keyPressed() {
    if (key == 'a') {
        saveCanvas('3point_Lorenz', 'png')
    }

    if (key == 'y') {
        show_critical = true;
    }

    if (key == 'n') {
        show_critical = false;
    }
}