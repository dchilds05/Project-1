let witchImgRight = new Image();
    witchImgRight.src = './images/witchRight.png';

    let witchImgLeft = new Image();
    witchImgLeft.src = './images/witchLeft.png';

    let witchImgUp = new Image();
    witchImgUp.src = './images/witchUp.png';

    let witchImgDown = new Image();
    witchImgDown.src = './images/witchDown.png';


    class Witch {
        constructor(canvasValue, canvasContext){
        this.canvas = canvasValue,
        this.ctx = canvasContext,   
        this.image = witchImgRight,
        this.x = canvasValue.width / 2,
        this.y = canvasValue.height / 2,
        this.height = canvasValue.height / 10,
        this.width = canvasValue.width / 11.25,
        this.speed = 125;
        }
        draw () {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    };

    class littleWitch {
        constructor (image, x, y, canvasValue, canvasContext) {
        this.canvas = canvasValue,
        this.ctx = canvasContext,   
        this.image = image,
        this.x = x,
        this.y = y,
        this.width = 200,
        this.height = 160,
        this.speed = 20;
        }

        draw () {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        move () {
            if(this.y <= 50 && this.x < this.canvas.width - 400){
                this.image = witchImgRight;
                this.y = 50;
                this.x += this.speed;
            } else if (this.x >= this.canvas.width - 400 && this.y < this.canvas.height - 170) {
                this.image = witchImgDown;
                this.x = this.canvas.width - 400;
                this.y += this.speed;
            } else if (this.y >= this.canvas.height - 170 && this.x > 200){
                this.image = witchImgLeft;
                this.y = this.canvas.height - 170;
                this.x -= this.speed;
            } else if (this.x <= 200 && this.y > 50){
                this.image = witchImgUp;
                this.x = 200;
                this.y -= this.speed;
            }
        }
    };

    