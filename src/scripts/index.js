/** @format */

import BootState from '../states/boot';
import HomeState from '../states/home';
import SplashState from '../states/splash';
import PlayState from '../states/play';
import GameOverState from '../states/game-over';

class Game extends Phaser.Game {
  constructor() {
    super(480 * window.devicePixelRatio, 760 * window.devicePixelRatio, Phaser.AUTO, 'phaser-game');
    this.state.add('Boot', BootState, false);
    this.state.add('Home', HomeState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Play', PlayState, false);
    this.state.add('GameOver', GameOverState, false);

    this.state.start('Boot');
  }
}

new Game();
