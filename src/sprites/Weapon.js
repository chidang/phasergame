/** @format */

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, damage, effect }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5, 0);
    this.inputEnabled = true;
    this.data.damage = damage;
    this.data.effect = effect;
  }
  
  update() {
  }
}
