import Phaser from 'phaser';

export default class Ghost {
  constructor(scene, x, y, target) {
    this.scene = scene;
    this.target = target;

    // visuel
    this.sprite = scene.add.rectangle(x, y, 20, 20, 0xff0000);

    // physique
    scene.physics.add.existing(this.sprite);

    this.sprite.body.setCollideWorldBounds(true);

    this.speed = 80;
  }

  update() {
    const dx = this.target.x - this.sprite.x;
    const dy = this.target.y - this.sprite.y;

    const angle = Math.atan2(dy, dx);

    this.sprite.body.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );
  }

  get body() {
    return this.sprite.body;
  }
}
``