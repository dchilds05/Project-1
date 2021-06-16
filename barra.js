let movingLeft = true;

    class Barra {
        constructor(canvasValue, canvasContext){
        this.canvas = canvasValue,
        this.ctx = canvasContext,   
        this.x = this.canvas.width / 2,
        this.y = this.canvas.height / 2 - 500,
        this.width = this.canvas.width * (1/5),
        this.height = this.canvas.height * (80/2250),
        this.speed = 5;
        }
        draw () {
            this.ctx.fillStyle = "#442A2C";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.strokeStyle = "#271513";
            this.ctx.lineWidth = 10;
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
            if (movingLeft === true){
                if(this.x <= 0){
                    movingLeft = false;
                } else {
                    this.x -= this.speed;
                }
            } else {
                if ((this.x + this.width) >= this.canvas.width){
                    movingLeft = true;
                } else {
                    this.x += this.speed;
                }
            }
        }
    }