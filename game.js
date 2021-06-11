window.onload = () => {

    const canvas = document.getElementById('canvasId');
    const ctx = canvas.getContext('2d');

    let gameInterval = null;

    let witchImg = new Image();
    witchImg.src = './images/witchRight.png';
        
    
    const witch = {
        image: witchImg,
        height: 100,
        width: 50,//this.height * (50/36),
        x: 100,//(canvas.width / 2) - (this.width / 2),
        y: 200,//canvas.height - this.height,
        draw: function () {
            console.log('Drawing witch');
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    };

    document.getElementById('start-button').onclick = () => {
        console.log("button clicked");
        startGame();
    };

    function startGame() {
        gameInterval = requestAnimationFrame(startGame);
        console.log('Game Started');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        witch.draw();
    }


};