import Phaser from 'phaser';

export default class Ghost {
  constructor(scene, x, y, target, tileSize) {
    this.scene = scene;
    this.target = target;

    // ✅ VISUEL
    this.baseColor = 0xff0000;

    this.sprite = scene.add.rectangle(
      x,
      y,
      tileSize * 0.8,
      tileSize * 0.8,
      this.baseColor
    );

    // ✅ PHYSIQUE
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);

    // ✅ CONFIG
    this.speed = 80;

   
this.active = false;

  scene.time.delayedCall(1000, () => {
    this.active = true;
  });
}

  update() {
  if (!this.active) {
    this.sprite.body.setVelocity(0, 0);
    return;
  }

  this.chaseTarget();
}

  chaseTarget() {
    const dx = this.target.x - this.sprite.x;
    const dy = this.target.y - this.sprite.y;

    const distance = Phaser.Math.Distance.Between(
      this.sprite.x,
      this.sprite.y,
      this.target.x,
      this.target.y
    );

    const angle = Math.atan2(dy, dx);

    // ✅ vitesse adaptative SIMPLE (stable)
    let speed = this.speed;

    if (distance > 200) {
      speed = this.speed * 1.3;
    } else if (distance < 100) {
      speed = this.speed * 0.9;
    }

    // ✅ mouvement
    this.sprite.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );

    // ✅ feedback visuel
    if (distance < 100) {
      this.sprite.setFillStyle(0xffaaaa); // proche
    } else if (distance > 200) {
      this.sprite.setFillStyle(0xaa0000); // loin (agressif)
    } else {
      this.sprite.setFillStyle(this.baseColor);
    }
  }

  get body() {
    return this.sprite.body;
  }
}

