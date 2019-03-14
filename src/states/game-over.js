/** @format */

export default class GameOver extends Phaser.State {
  init() {
    this.txtGameOver = null;
  }
  create() {
    var gameOverStyle = {
      font: 'bold 50px Arial',
      fill: '#FFF',
      boundsAlignH: 'center',
      boundsAlignV: 'center',
    };

    this.txtGameOver = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over', gameOverStyle);
    this.txtGameOver.anchor.setTo(0.5, 0.5);
  }
}
