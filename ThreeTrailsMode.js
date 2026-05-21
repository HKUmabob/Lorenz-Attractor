class ThreeTailsMode {
    constructor() {
        this.trail1 = new IndividualTrail(color(180, 100, 100));
        this.trail2 = new IndividualTrail(color(60, 100, 100));
        this.trail3 = new IndividualTrail(color(327, 92, 100));
    }

    updateTrails(){
        scale(5.5)
 
        this.trail1.upadateDraw();
        this.trail2.upadateDraw();
        this.trail3.upadateDraw();
    }

    init(){
        this.trail1.points = [];
        this.trail2.points = [];
        this.trail3.points = [];

        this.trail1.points.push(createVector(0.01, 1, 0.59));
        this.trail2.points.push(createVector(0.01, 1, 0.43));
        this.trail3.points.push(createVector(0.01, 1, 0.25));
        frameRate(100);
    }
    
}

class IndividualTrail {
    constructor(color){
        this.points;;
        this.p = 28;
        this.s = 10;
        this.b = 8 / 3;
        this.h = 0.01;

        this.color = color;

        this.currentPosition;
        this.nextPosition;
    }

    upadateDraw() {
        noFill();
        beginShape();
        strokeWeight(3);
        stroke(this.color);
        for (let point of this.points) {
            vertex(point.x, point.y, point.z);
            if (point == this.points[this.points.length - 1]) {
                push();
                translate(point.x, point.y, point.z);
                fill(this.color);
                sphere(0.5);
                pop();
            }
        }
        endShape();

        if (frameCount > 400) {
            this.points.shift();
        }

        this.currentPosition = this.points[this.points.length - 1];
        this.nextPosition = calculateRk4(this.currentPosition, this.s, this.p, this.b, this.h);
        this.points.push(this.nextPosition);
    }
}