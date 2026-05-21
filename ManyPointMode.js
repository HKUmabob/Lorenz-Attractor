class ManyPointMode{
    constructor(){
        this.p = 28;
        this.s = 10;
        this.b = 8 / 3;
        this.h = 0.01;
        this.particles = 3500;

        this.points;
        this.hue;

        this.coord;
        this.currentPosition;
        this.nextPosition;
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
        for(let i = 0; i < this.particles; i++) {
            this.currentPosition = this.points[i];
            this.nextPosition = calculateRk4(this.currentPosition, this.s, this.p, this.b, this.h);

            this.velocity = p5.Vector.dist(this.currentPosition, this.nextPosition);
            this.hue = map(this.velocity, 0.1*2.4, 1.2*2.4, 0, 240);
            
            push();
            translate(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z);
            stroke(this.hue, 100,175, 0.4);
            fill(this.hue, 100,175, 0.6);
            sphere(0.05);
            pop();
            

            this.currentPosition.set(this.nextPosition.x, this.nextPosition.y, this.nextPosition.z);
        }

    }
}