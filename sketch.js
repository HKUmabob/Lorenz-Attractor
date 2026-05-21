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
let scalingFactor = 5.5;


let singlePointMode;
let threeTrailsMode;
let manyPointMode

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB);
	setAttributes('antialias', true);
	
	singlePointMode = new SinglePointMode();
	threeTrailsMode = new ThreeTailsMode();
	manyPointMode = new ManyPointMode();
	singlePointMode.init();
	threeTrailsMode.init();
	manyPointMode.init();

	dropdown = createSelect();
	dropdown.position(10, 10);
	dropdown.option('Select a mode to draw');
	dropdown.option('Single Point');
	dropdown.option('3 Trails');
	dropdown.option('Many Point');
	dropdown.changed(chnageMode);

	lookPosition = p5.Vector.lerp(
		createVector(critical_x1, critical_y1, critical_z1),
		createVector(critical_x2, critical_y2, critical_z2),
		0.5
	);

	easycam = createEasyCam({
        distance: 500,
        center: [lookPosition.x * scalingFactor, lookPosition.y * scalingFactor, lookPosition.z * scalingFactor]
    });

	easycam.pushResetState();
}

function draw() {
	scale(scalingFactor);
	background(0);

	drawSelectedMode();

	if (show_critical) {
		drawCritical();
	}
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

	threeTrailsMode.init();
	singlePointMode.init();
	manyPointMode.init();
}

function drawSelectedMode(){
	if (currentMode === 'Single Point'){
		singlePointMode.updateDraw();
		
	} else if (currentMode === '3 Trails'){
		threeTrailsMode.updateTrails();

	} else if (currentMode === 'Many Point'){
		manyPointMode.movePoints();
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