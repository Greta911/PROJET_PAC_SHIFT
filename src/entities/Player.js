import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // ✅ VISUEL
    this.sprite = scene.add.circle(x, y, 10, 0xffff00);

    // ✅ PHYSIQUE
    scene.physics.add.existing(this.sprite);

    this.sprite.body.setCollideWorldBounds(true);

    // config
    this.speed = 120;

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown) vx = -this.speed;
    else if (this.cursors.right.isDown) vx = this.speed;

    if (this.cursors.up.isDown) vy = -this.speed;
    else if (this.cursors.down.isDown) vy = this.speed;

    this.sprite.body.setVelocity(vx, vy);
  }

  // ✅ IMPORTANT pour collisions Phaser
  get body() {
    return this.sprite.body;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  setFillStyle(color) {
    this.sprite.setFillStyle(color);
  }
}