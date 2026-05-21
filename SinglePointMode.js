class SinglePointMode {
    constructor(){
        this.points = [];
        this.p = 28;
        this.s = 10;
        this.b = 8 / 3;
        this.h = 0.01;
        this.hueIncrement = 1.5
        this.currentHue = 0;
        this.currentPosition;
        this.nextPosition;
    }

    init(){
        this.points = [];
        this.points.push(createVector(0.01, 0, 0));
        strokeWeight(5);
    }
    
    updateDraw(){

        this.currentHue = 0;
        for (let p of this.points){
            stroke(this.currentHue, 100, 100);
		    point(p.x, p.y, p.z);

            if (this.currentHue >= 360){
                this.hueIncrement = -1.5;

            } else if (this.currentHue <= 0){
                this.hueIncrement = 1.5;
            }

            this.currentHue += this.hueIncrement;
        }

        this.currentPosition = this.points[this.points.length - 1];
        this.nextPosition = calculateRk4(this.currentPosition, this.s, this.p, this.b, this.h);
        this.points.push(this.nextPosition);


        if (this.points.length >= 3000){
            this.points.shift();
        }
    }
}