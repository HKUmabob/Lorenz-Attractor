class ManyPointMode{
    constructor(p, s, b, h, scale){
        this.particles = 75000;
        this.points = new Float32Array(this.particles * 3);
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;

        this.scaledDistanceMin = 0.1**2 * scale;
        this.scaledDistanceMax = 1.2**2 * scale;

        this.points;
        this.hue;
        this.coord;
        this.currentPosition;
        this.velSqrd;
    }

    init(){
        let index
        for(let i = 0; i < this.particles; i++) {
            index = i *3;
            this.points[index] = random(20, 40);
            this.points[index + 1] = random(20, 40);
            this.points[index + 2] = random(0, 10);
        }
        stroke(20, 100, 100, 0.5);
    }

    movePoints(){
        strokeWeight(3);
        noFill();

        let preX, preZ, preY, nextX, nextY, nextZ, k1x, k1y, k1z, k2x, k2y, k2z, k3x, k3y, k3z, k4x, k4y, k4z;
        let index, x2, y2, z2, x3, y3, z3, x4, y4, z4, h2;

        beginShape(POINTS);
        for(let i = 0; i < this.particles; i++) {
            this.currentPosition = this.points[i];

            index = i * 3;

            preX = this.points[index];
            preY = this.points[index + 1];
            preZ = this.points[index + 2];

            k1x = this.s * (preY - preX);
            k1y = preX * (p - preZ) - preY;
            k1z = preX * preY - b * preZ;
            
            h2 = this.h / 2;
            x2 = preX + k1x * h2;
            y2 = preY + k1y * h2;
            z2 = preZ + k1z * h2;
            k2x = this.s * (y2 - x2);
            k2y = x2 * (this.p - z2) - y2;
            k2z = x2 * y2 - this.b * z2;

            // k3
            x3 = preX + k2x * h2;
            y3 = preY + k2y * h2;
            z3 = preZ + k2z * h2;
            k3x = this.s * (y3 - x3);
            k3y = x3 * (this.p - z3) - y3;
            k3z = x3 * y3 - this.b * z3;

            // k4
            x4 = preX + k3x * this.h;
            y4 = preY + k3y * this.h;
            z4 = preZ + k3z * this.h;
            k4x = this.s * (y4 - x4);
            k4y = x4 * (this.p - z4) - y4;
            k4z = x4 * y4 - this.b * z4;
            
            nextX = preX + (this.h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
            nextY = preY + (this.h / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
            nextZ = preZ + (this.h / 6) * (k1z + 2 * k2z + 2 * k3z + k4z);
	        
            this.points[index] = nextX;
            this.points[index + 1] = nextY;
            this.points[index + 2] = nextZ;

            
            this.velSqrd = (preX - nextX)**2 + (preY - nextY)**2 + (preZ - nextZ)**2;               //comment out these 3 lines to get a massive performance boost
            this.hue = map(this.velSqrd, this.scaledDistanceMin, this.scaledDistanceMax, 0, 240);   // <--
            stroke(this.hue, 100,175, 0.4);                                                         // <--

            vertex(nextX, nextY, nextZ);
;
        }

        
        endShape();
        
    }
}