const witchImgRight = document.createElement('img');
witchImgRight.src = './images/witchRight.png';

class Witch {
  constructor(canvasContext, positionX, positionY) {
    this.ctx = canvasContext
    this.image = witchImgRight,
    this.x = positionX,
    this.y = positionY,
    this.width = 50,
    this.height = 100
  }

  draw () {
		this.ctx.drawImage(witchImgRight, this.x, this.y, this.width, this.height);
	}
};
