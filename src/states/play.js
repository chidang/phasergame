/** @format */

import Weapon from '../sprites/Weapon';

export default class Play extends Phaser.State {
  init() {
    this.timeLeft = 35;
    this.total = 0;
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Hình nền
    this.game.add.tileSprite(0, 0, 480, 768, 'background');

    // nhạc nền
    this.bgMusic = this.game.add.audio('backgroundMusic');
    this.bgMusic.volume = 0.4;
    this.bgMusic.play();
    this.soundHit1 = this.game.add.audio('hit1');
    this.soundHit2 = this.game.add.audio('hit2');

    // Vũ khí
    this.WeaponBag = this.game.add.group();
    this.WeaponBag.classType = Weapon;
    for (let i = 0; i < 100; i++) {
      this.WeaponBag.add(new Weapon({ game: this.game, x: i * 70, y: 0, asset:  i % 2 ? 'hat' : 'watch', damage: i % 2 ? 10 : -5, effect: i % 2 ? 'hit1' : 'hit2' }));
    }
    this.WeaponBag.x = this.game.world.width;
    this.WeaponBag.y = 100;
    this.game.add.tween(this.WeaponBag).to( { x: -this.WeaponBag.width }, 20000, Phaser.Easing.Linear.None, true, 0, 1000, false);

    // Nhân vật
    this.Player = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'pigIdle');

    // Đồng hồ
    this.Clock = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'clock');
    this.Clock.anchor.setTo(0.5, 1);
    this.Clockwise = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'clockwise');
    this.Clockwise.anchor.setTo(0.5, 1);

    // Bật mô phỏng vật lý
    this.game.physics.arcade.enable([...this.WeaponBag.children, this.Player]);
    this.game.physics.arcade.gravity.y = 2000;
    for (let i = 0; i < this.WeaponBag.children.length; i++) {
      let elm = this.WeaponBag.children[i];
      elm.body.enable = false;
      elm.events.onInputDown.add(this.drop, this); 
    }

    this.Player.anchor.setTo(0.5, 1);
    this.Player.body.allowGravity = false;
    this.Player.body.immovable = true;
    this.Player.body.onCollide = new Phaser.Signal();
    this.Player.body.onCollide.add(this.hit, this);

    this.countdownTimer();
  }

  update() {
    for (let i = 0; i < this.WeaponBag.children.length; i++) {
      this.game.physics.arcade.collide(this.WeaponBag.children[i], this.Player);
    }
  }

  drop(weapon) {
    weapon.body.enable = true;
  }

  hit(player, weapon) {
    switch (weapon.data.effect) {
      case 'hit1':
        this.soundHit1.play();
        break;
      case 'hit2':
        this.soundHit2.play();
        break;
    }
    player.loadTexture('pigFun', 0);
    player.animations.add('walk');
    player.animations.play('walk', 10, true);

    setTimeout(() => player.loadTexture('pigIdle', 0), 1000);
    weapon.visible = false;
    weapon.body.enable = false;
    this.Clockwise.angle += weapon.data.damage;
  }

  countdownTimer() {
    var txtCountDownStyle = {
      font: 'bold 100px Ranga',
      fill: '#FFF',
      boundsAlignH: 'center',
      boundsAlignV: 'center',
    };

    this.txtCountDown = this.game.add.text(this.game.world.centerX, 100, '0:' + this.timeLeft, txtCountDownStyle);
    this.txtCountDown.anchor.setTo(0.5, 1);

    var timeHandle = setInterval(() => {
      if (this.timeLeft === 0) {
        clearInterval(timeHandle);
        // Game Over
      }
      this.txtCountDown.setText('0:' + this.timeLeft);
      this.timeLeft--;
    }, 1000);
  }
}
