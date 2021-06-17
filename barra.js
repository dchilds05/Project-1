let movingLeft = true;

    class Barra {
        constructor(canvasValue, canvasContext, width){
        this.canvas = canvasValue,
        this.ctx = canvasContext,   
        this.x = this.canvas.width / 2,
        this.y = this.canvas.height / 2 - 500,
        this.width = width,
        this.height = this.canvas.height * (80/2250),
        this.speed = 5;
        }
        draw (fill, color) {
            this.ctx.fillStyle = fill;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.strokeStyle = color;
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