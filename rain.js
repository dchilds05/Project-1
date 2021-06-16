class Rain {
    constructor(canvasValue, canvasContext) {
        this.canvas = canvasValue,
        this.ctx = canvasContext,   
        this.xPos = Math.random() * this.canvas.width,
        this.yPos = 0,
        this.xRad = 5,
        this.yRad = 70,
        this.speed = 50;
    }

    draw(){
        this.ctx.fillStyle = "#69F6E3";
        this.ctx.beginPath();
        this.ctx.ellipse(this.xPos, this.yPos, this.xRad, this.yRad, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    move(barra, rainArray){
        let touchingBarra = 
        this.xPos > barra.x &&
        this.xPos < barra.x + barra.width &&
        this.yPos + this.yRad > barra.y - 20 &&
        this.yPos + this.yRad < barra.y + barra.height;


        if (this.yPos > this.canvas.height) {
            rainArray.splice(this, 1);
        } else if (touchingBarra){
            this.yPos = 0;
            this.xPos = Math.random() * this.canvas.width;
        } else {
            this.yPos += this.speed;
        }

    }
}