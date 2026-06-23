import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Arc {
  constructor(scene, x, y) {
    super(scene, x, y, 10, 0, 360, false, 0xffff00);

    this.scene = scene;

    // ajout à la scène
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // physique
    this.body.setCollideWorldBounds(true);

    // input interne (découplé de la scène)
    this.cursors = scene.input.keyboard.createCursorKeys();

    // config
    this.speed = 120;
  }

  update() {
    this.handleMovement();
  }

  handleMovement() {
    let vx = 0;
    let vy = 0;

    // horizontal
    if (this.cursors.left.isDown) {
      vx = -this.speed;
    } else if (this.cursors.right.isDown) {
      vx = this.speed;
    }

    // vertical
    if (this.cursors.up.isDown) {
      vy = -this.speed;
    } else if (this.cursors.down.isDown) {
      vy = this.speed;
    }

    this.body.setVelocity(vx, vy);
  }
}
