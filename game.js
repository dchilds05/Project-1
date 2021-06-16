window.onload = () => {

    //HEALTH BAR COMPONENTS
    let health10 = document.getElementById('health10');
    let health20 = document.getElementById('health20');
    let health30 = document.getElementById('health30');
    let health40 = document.getElementById('health40');
    let health50 = document.getElementById('health50');
    let health60 = document.getElementById('health60');
    let health70 = document.getElementById('health70');
    let health80 = document.getElementById('health80');
    let health90 = document.getElementById('health90');
    let health100 = document.getElementById('health100');

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

    myMusic = document.querySelector("#music");
    
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
    
    function updateHealth(){
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

        if(healthPoints === 100) {
            health100.style.display = "inline"; 
        }
        if(healthPoints < 100 && healthPoints > 90) {
            health100.style.display = "none"; 
            health90.style.display = "inline";
        }
        if(healthPoints < 90 && healthPoints > 80) {
            health90.style.display = "none"; 
            health80.style.display = "inline";
        }
        if(healthPoints < 80 && healthPoints > 70) {
            health80.style.display = "none"; 
            health70.style.display = "inline";
        }
        if(healthPoints < 70 && healthPoints > 60) {
            health70.style.display = "none"; 
            health60.style.display = "inline";
        }
        if(healthPoints < 60 && healthPoints > 50) {
            health60.style.display = "none"; 
            health50.style.display = "inline";
        }
        if(healthPoints < 50 && healthPoints > 40) {
            health50.style.display = "none"; 
            health40.style.display = "inline";
        }
        if(healthPoints < 40 && healthPoints > 30) {
            health40.style.display = "none"; 
            health30.style.display = "inline";
        }
        if(healthPoints < 30 && healthPoints > 20) {
            health30.style.display = "none"; 
            health20.style.display = "inline";
        }
        if(healthPoints < 20 && healthPoints > 10) {
            health20.style.display = "none"; 
            health10.style.display = "inline";
        }
        if(healthPoints < 5 && healthPoints > 0) {
            health10.style.display = "none";
        }
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
        myMusic.play();
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

        updateHealth();

        pointsHTML.innerHTML = score;
    
        frameId = requestAnimationFrame(gameLoop);
        }
    }

    window.addEventListener('keydown', (event) => witch.moveWitch(event, barra));
    
};