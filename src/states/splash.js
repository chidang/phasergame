/** @format */

export default class Splash extends Phaser.State {
  init() {
    this.counter = 3;
    this.txtCountDown = null;
    this.txtLoading = null;
  }

  preload() {
    this.game.load.image('background', './images/background.jpg');
    this.game.load.image('start', './images/start.png');
    this.game.load.image('quit', './images/quit.png');
    this.game.load.image('pigIdle', './images/pig.png');
    this.game.load.image('pigFun', './images/pig-fun.png');
    this.game.load.atlasJSONHash('pigFun', './data/burnt.png', './data/burnt.json');
    this.game.load.image('hooker', './images/hooker.png');
    this.game.load.image('hat', './images/hat.png');
    this.game.load.image('watch', './images/watch.png');
    this.game.load.image('clock', './images/clock.png');
    this.game.load.image('clockwise', './images/clockwise.png');
    this.game.load.audio('backgroundMusic', './sounds/background-music.ogg');
    this.game.load.audio('hit1', './sounds/hit1.ogg');
    this.game.load.audio('hit2', './sounds/hit2.ogg');
  }

  create() {
    this.loading();
    this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onFileComplete.add(this.fileComplete, this);
    this.game.load.onLoadComplete.add(this.loadComplete, this);

    this.game.load.start();
  }

  countdownTimer() {
    var txtCountDownStyle = {
      font: 'bold 100px Ranga',
      fill: '#FFF',
      boundsAlignH: 'center',
      boundsAlignV: 'center',
    };

    this.txtCountDown = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      this.counter,
      txtCountDownStyle
    );
    this.txtCountDown.anchor.setTo(0.5, 0.5);

    var _this = this;
    var timeHandle = setInterval(function() {
      if (_this.counter === 1) {
        clearInterval(timeHandle);
        _this.game.state.start('Home');
      }
      _this.txtCountDown.setText(_this.counter);
      _this.counter--;
    }, 1000);
  }

  loading() {
    this.txtLoading = this.game.add.text(this.game.world.centerX, 100, 'Loading...');
    this.txtLoading.anchor.setTo(0.5, 0.5);
  }

  loadStart() {
    console.log('loadStart');
    this.txtLoading.setText('Loading ...');
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log('fileComplete');
    this.txtLoading.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
  }

  loadComplete() {
    console.log('Load Complete');
    this.txtLoading.setText('Load Complete');
    this.countdownTimer();
    // this.game.state.start('Play');
  }
}
