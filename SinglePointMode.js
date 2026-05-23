class SinglePointMode {

    /**
     * 
     * @param {number} p Phi
     * @param {number} s Sigma
     * @param {number} b Beta
     * @param {number} h Inteval width
     * @param {number} history Number of past points to show
     */
    constructor(p, s, b, h, history){
        this.points = [];
        this.p = p;
        this.s = s;
        this.b = b;
        this.h = h;
        this.history = history
        this.hueIncrement = 1.5
        this.currentHue = 0;
        this.currentPosition;
    }


    /**
     * Used when initializing at setup and changing mode
     */
    init(){
        this.points = [];
        this.currentPosition = createVector(0.01, 0, 0);
        this.points.push(this.currentPosition.copy());
        strokeWeight(5);
    }


    /**
     * Update positions and draw
     */
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


        // remove the last point from the list
        if (this.points.length >= this.history){
            this.points.shift();
        }
    }
}