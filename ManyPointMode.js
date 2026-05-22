class ManyPointMode{
    constructor(p, s, b, h, scale){
        this.points = [];
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;
        this.scale = sqrt(scale)
        this.particles = 100000;

        this.points;
        this.hue;

        this.coord;
        this.currentPosition;
    }

    init(){
        this.points = [];
        let x, y, z;
        for(let i = 0; i < this.particles; i++) {
            x = random(20, 40);
            y = random(20, 40);
            z = random(0, 10);
            this.points.push(createVector(x, y, z));
        }
    }

    movePoints(){
        strokeWeight(4);
        noFill();

        beginShape(POINTS);
        for(let i = 0; i < this.particles; i++) {
            this.currentPosition = this.points[i];
            this.velocity = calculateRk4(this.currentPosition, this.p, this.s, this.b, this.h);
            this.hue = map(this.velocity, 0.1 * this.scale, 1.2 * this.scale, 0, 240);
            
            stroke(this.hue, 100,175, 0.4);
            vertex(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z);
        }

        endShape();

    }
}