let pumpkinImg = new Image();
    pumpkinImg.src = './images/pumpkin.png';

    class Pumpkin {
        constructor(canvasValue, canvasContext) {
            this.canvas = canvasValue,
            this.ctx = canvasContext, 
            this.image = pumpkinImg,
            this.x = Math.random() * this.canvas.width,
            this.y = 0,
            this.height = this.canvas.height / 12,
            this.width = this.canvas.width / 24,
            this.speed = 5;
        }

        draw(){
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        move(barra, pumpkinArray){
            let touchingBarra = 
            this.x > barra.x &&
            this.x < barra.x + barra.width &&
            this.y + this.height > barra.y - 20 &&
            this.y + this.height < barra.y + barra.height;


            if (this.y > this.canvas.height) {
				pumpkinArray.splice(this, 1);
            } else if (touchingBarra){
                this.y = 0;
                this.x = Math.random() * this.canvas.width;
            } else {
				this.y += this.speed;
			}
        }

        checkForWitchContact(witch, pumpkinArray, score){
            let contactWithWitch = 
                witch.x < this.x + this.width &&
                witch.x + witch.width > this.x &&
                witch.y < this.y + this.height &&
                witch.y + witch.height > this.y;

            if(contactWithWitch){
                pumpkinArray.splice(this, 1);
                return true;
            }
        }
    }