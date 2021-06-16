window.onload = () => {

    const canvas = document.getElementById('canvasId');
    const canvasCtx = canvas.getContext('2d');

    

    let startBtn = document.getElementById('start-button');
    let header1Display = document.querySelector("#header1");
    let header2Display = document.querySelector("#header2");
    let headerImages = document.querySelector("#header-images");
    let middleSection = document.querySelector("#middle-section");
    let bodyDiv = document.querySelector("#body-div");
    let footerImages = document.querySelector("#footer-images");

    header1Display.style.display = "none";
    header2Display.style.display = "none";

    let frameId = null;
    let frameId2 = null;

    startBtn.onclick = () => {
        clearInterval(littleWitches);
        gameLoop();
        startBtn.style.display = "none";
        headerImages.style.display = "none";
        middleSection.style.display = "none";
        bodyDiv.style.display = "none";
        footerImages.style.display = "none";
        header1Display.style.display = "block";
        header2Display.style.display = "block";
    };

    let healthPointsHTML = document.querySelector("#health");
    let healthPoints = 100;

    let pointsHTML = document.querySelector("#points");
    let score = 0;

    let rainArray = [];

    let pumpkinArray = [];

    function gameLoop() {
        pointsHTML.innerText = score;

        if(score >= 2) {
            cancelAnimationFrame(frameId);
            alert('You Won!');
            window.location.reload(); 
        } else if (Math.round(healthPoints) === 0) {
            cancelAnimationFrame(frameId);
            alert('You Lost!');
            window.location.reload(); 
        } else {
        
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        witch.draw();
        barra.draw();

        rainArray.push(new Rain());

        if(frameId % 324 === 0) pumpkinArray.push(new Pumpkin());

        let witchBelowBarra = 
        witch.x > barra.x  - (witch.width/2) &&
        witch.x + witch.width < barra.x + barra.width + (witch.width/2) &&
        witch.y > barra.y + barra.height;

        if (witchBelowBarra && healthPoints < 100){
            healthPoints += (1/5);
        }   
        if (!witchBelowBarra && healthPoints > 0){
            healthPoints -= (1/5);
        }
        healthPointsHTML.innerText = `${Math.round(healthPoints)} %`;

        pointsHTML.innerText = score;
        
        rainArray.forEach((drop) => {
            drop.draw();
            drop.move();
        });
        
        pumpkinArray.forEach((item) => {
            item.draw();
            item.move();
            item.checkForWitchContact();
        });

        frameId = requestAnimationFrame(gameLoop);

    } 
    }

    const witch = new Witch(canvas, canvasCtx);
    
    let littleWitch1 = new littleWitch (witchImgRight, 200, 50, canvas, canvasCtx);
    let littleWitch2 = new littleWitch (witchImgLeft, canvas.width - 400, canvas.height - 170, canvas, canvasCtx);
    
    littleWitch1.draw();
    littleWitch2.draw();
    
    let littleWitches = setInterval(() => {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        littleWitch1.draw();
        littleWitch2.draw();
        littleWitch1.move();
        littleWitch2.move();
    }, 17);
    

    const barra = new Barra(canvas, canvasCtx);

    class Rain {
        constructor() {
            this.xPos = Math.random() * canvas.width,
            this.yPos = 0,
            this.xRad = 5,
            this.yRad = 70,
            this.speed = 50;
        }

        draw(){
            canvasCtx.fillStyle = "#69F6E3";
            canvasCtx.beginPath();
            canvasCtx.ellipse(this.xPos, this.yPos, this.xRad, this.yRad, 0, 0, 2 * Math.PI);
            canvasCtx.fill();
        }

        move(){
            let touchingBarra = 
            this.xPos > barra.x &&
            this.xPos < barra.x + barra.width &&
            this.yPos + this.yRad > barra.y - 20 &&
            this.yPos + this.yRad < barra.y + barra.height;


            if (this.yPos > canvas.height) {
				rainArray.splice(this, 1);
            } else if (touchingBarra){
                this.yPos = 0;
                this.xPos = Math.random() * canvas.width;
            } else {
				this.yPos += this.speed;
			}

        }
    }



    let pumpkinImg = new Image();
    pumpkinImg.src = './images/pumpkin.png';

    class Pumpkin {
        constructor() {
            this.image = pumpkinImg,
            this.x = Math.random() * canvas.width,
            this.y = 0,
            this.height = canvas.height / 12,
            this.width = canvas.width / 24,
            this.speed = 5;
        }

        draw(){
            canvasCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        move(){
            let touchingBarra = 
            this.x > barra.x &&
            this.x < barra.x + barra.width &&
            this.y + this.height > barra.y - 20 &&
            this.y + this.height < barra.y + barra.height;


            if (this.y > canvas.height) {
				pumpkinArray.splice(this, 1);
            } else if (touchingBarra){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            } else {
				this.y += this.speed;
			}
        }

        checkForWitchContact(){
            let contactWithWitch = 
                witch.x < this.x + this.width &&
                witch.x + witch.width > this.x &&
                witch.y < this.y + this.height &&
                witch.y + witch.height > this.y;

            if(contactWithWitch){
                pumpkinArray.splice(this, 1);
                score++;
            }
        }
    }

    window.addEventListener('keydown', (event) => witch.moveWitch(event, barra));

};