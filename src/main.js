
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,

  width: 768,   // ✅ plus large
  height: 448,  // ✅ proportion gardée (x2)

  backgroundColor: '#000000',

  scale: {
    mode: Phaser.Scale.FIT,   // ✅ adapte à l’écran
    autoCenter: Phaser.Scale.CENTER_BOTH // ✅ centre
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [GameScene]
};

new Phaser.Game(config);
