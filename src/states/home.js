/** @format */

export default class Home extends Phaser.State {
  create() {
    this.btnPlay = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'start');
    this.btnPlay.inputEnabled = true;
    this.btnPlay.anchor.setTo(0.5, 0.5);
    this.btnPlay.events.onInputDown.add(this.gotoSplash, this);
  }

  gotoSplash() {
    this.game.state.start('Play');
  }
}
