class SinglePointMode {
    constructor(p, s, b, h){
        this.points = [];
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;
        this.hueIncrement = 1.5
        this.currentHue = 0;
        this.currentPosition;
    }

    init(){
        this.points = [];
        this.currentPosition = createVector(0.01, 0, 0);
        this.points.push(this.currentPosition.copy());
        strokeWeight(5);
    }
    
    updateDraw(){

        this.currentHue = 0;
        beginShape(POINTS);
        for (let p of this.points){
            stroke(this.currentHue, 100, 100);
		    vertex(p.x, p.y, p.z);

            if (this.currentHue >= 360){
                this.hueIncrement = -1.5;

            } else if (this.currentHue <= 0){
                this.hueIncrement = 1.5;
            }

            this.currentHue += this.hueIncrement;
        }
        endShape();

        calculateRk4(this.currentPosition, this.p, this.s, this.b, this.h);
        this.points.push(this.currentPosition.copy());


        if (this.points.length >= 3000){
            this.points.shift();
        }
    }
}