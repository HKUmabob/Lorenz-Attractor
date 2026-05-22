class ThreeTailsMode {
    constructor(p, s, b, h){
        this.points = [];
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;
        this.trail1 = new IndividualTrail(this.p, this.s,  this.b, this.h, color(180, 100, 100));
        this.trail2 = new IndividualTrail(this.p, this.s,  this.b, this.h, color(60, 100, 100));
        this.trail3 = new IndividualTrail(this.p, this.s,  this.b, this.h, color(327, 92, 100));
    }

    updateTrails(){
        
        this.trail1.upadateDraw();
        this.trail2.upadateDraw();
        this.trail3.upadateDraw();
    }

    init(){
        this.trail1.points = [];
        this.trail2.points = [];
        this.trail3.points = [];

        this.trail1.age = 0
        this.trail2.age = 0
        this.trail3.age = 0

        this.trail1.currentPosition = createVector(0.19, 1.2, 0.59)
        this.trail2.currentPosition = createVector(0.16, 1.1, 0.43)
        this.trail3.currentPosition = createVector(0.13, 1.3, 0.25)

        this.trail1.points.push(this.trail1.currentPosition.copy());
        this.trail2.points.push(this.trail2.currentPosition.copy());
        this.trail3.points.push(this.trail3.currentPosition.copy());
    }
    
}

class IndividualTrail {
    constructor(p, s, b, h, color){
        this.points;
        this.age;
        
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;

        this.color = color;

        this.currentPosition;
    }

    upadateDraw() {
        noFill();
        strokeWeight(3);
        stroke(this.color);
        
        beginShape();
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

        if (this.age > 400) {
            this.points.shift();
        }

        calculateRk4(this.currentPosition, this.p, this.s, this.b, this.h);
        this.points.push(this.currentPosition.copy());
        
        this.age++
    }
}