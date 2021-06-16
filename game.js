window.onload = () => {

    //SETTING UP PRE-GAME
    let startBtn = document.getElementById('start-button');
    let header1Display = document.querySelector("#header1");
    let header2Display = document.querySelector("#header2");
    let headerImages = document.querySelector("#header-images");
    let middleSection = document.querySelector("#middle-section");
    let bodyDiv = document.querySelector("#body-div");
    let footerImages = document.querySelector("#footer-images");

    header1Display.style.display = "none";
    header2Display.style.display = "none";

    let healthPoints = 100;

    let pointsHTML = document.querySelector("#points");
    let score = 0;

    let frameId = null;

    let rainArray = [];

    let pumpkinArray = [];

    const canvas = document.getElementById('canvasId');
    const canvasCtx = canvas.getContext('2d');

    const barra = new Barra(canvas, canvasCtx);
    const witch = new Witch(canvas, canvasCtx);
    
    function updateScore(){
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

        pointsHTML.innerHTML = score;
    }


    //PRE-GAME ANIMATION
    
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


    //CLICK EVENT AND START GAME

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

    function gameLoop() {
        //CHECKING FOR WIN OR LOSE
        console.log(Number(healthPoints));
        if(score >= 10) {
            cancelAnimationFrame(frameId);
            alert('You Won!');
            window.location.reload(); 
        } else if (healthPoints < 0) {
            cancelAnimationFrame(frameId);
            alert('You Lost!');
            window.location.reload(); 
        } else {
        
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        witch.draw();
        barra.draw();

        rainArray.push(new Rain(canvas, canvasCtx));
        
        rainArray.forEach((drop) => {
            drop.draw();
            drop.move(barra, rainArray);
        });

        if(frameId % 324 === 0) pumpkinArray.push(new Pumpkin(canvas, canvasCtx));
        
        pumpkinArray.forEach((item) => {
            item.draw();
            item.move(barra, pumpkinArray);
            if(item.checkForWitchContact(witch, pumpkinArray)) score++;
        });

        updateScore();
    
        frameId = requestAnimationFrame(gameLoop);
        }
    }

    window.addEventListener('keydown', (event) => witch.moveWitch(event, barra));
    
};