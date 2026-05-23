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
	
	// Initializing all three modes
	singlePointMode = new SinglePointMode(p, s, b, h, 3000);
	threeTrailsMode = new ThreeTailsMode(p, s, b, h, 400);
	manyPointMode = new ManyPointMode(p, s, b, h, scalingFactor, 75000); 	// Increase the last argument if your system can handle it
	singlePointMode.init();
	threeTrailsMode.init();
	manyPointMode.init();

	// Dropdown Menu
	dropdown = createSelect();
	dropdown.position(10, 10);
	dropdown.option('Select a mode to draw');
	dropdown.option('Single Point');
	dropdown.option('3 Trails');
	dropdown.option('Many Point');
	dropdown.changed(chnageMode);

	// Camera setup
	lookPosition = p5.Vector.lerp(
		createVector(critical_x1, critical_y1, critical_z1),
		createVector(critical_x2, critical_y2, critical_z2),
		0.5
	);

	easycam = createEasyCam({
        distance: 360,
        center: [lookPosition.x * scalingFactor, lookPosition.y * scalingFactor, lookPosition.z * scalingFactor]
    });

	easycam.pushResetState();

	//frameRate(100);
	chnageMode();
}


function draw() {
	scale(scalingFactor);
	background(0);

	drawSelectedMode();

	if (show_critical) {
		drawCritical();
	}
}



/**
 * Passed to the drop down menu
 */
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

	} else if (currentMode === 'Select a mode to draw') {
		show_critical = false;
	}
}


/**
 * Draws the critical points of the Attractor
 */
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
    if (key == 'y') {
		if (currentMode !== 'Select a mode to draw'){
			show_critical = true;
		}
    }

    if (key == 'n') {
		show_critical = false;
    }


	//save as a picture / gif
	//saving as a gif might not work if there are too many points or the gif length is too long
	//reduce the number of points and reduce the color range in ManyPointsMode.js line 105
	if (key == 'p') {
		if (currentMode === 'Single Point'){
			saveCanvas('SinglePoint', 'jpg');
		
		} else if (currentMode === '3 Trails'){
			saveCanvas('3Trails', 'jpg');
			
		} else if (currentMode === 'Many Point'){
			saveGif('ManyPoints', 7);

		}
	}
}
	

function windowResized() {
		resizeCanvas(windowWidth, windowHeight);
}