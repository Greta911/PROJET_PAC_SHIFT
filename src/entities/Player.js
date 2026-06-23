import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y, tileSize) {
  this.scene = scene;
  this.tileSize = tileSize;

  // ✅ VISUEL
  this.sprite = scene.add.circle(x, y, tileSize * 0.3, 0xffff00);

  // ✅ PHYSIQUE
  scene.physics.add.existing(this.sprite);
  this.sprite.body.setCollideWorldBounds(true);

  // ✅ INPUT
  this.cursors = scene.input.keyboard.createCursorKeys();

  // ✅ CONFIG PROPRE
  
this.currentDirection = { x: 0, y: 0 };
this.nextDirection = { x: 0, y: 0 };


  this.speed = 140;
  this.snapThreshold = 4;
}


readInput() {
  // priorité horizontale puis verticale (feeling Pac-Man)
  if (this.cursors.left.isDown) {
    this.nextDirection = { x: -1, y: 0 };
  }

  if (this.cursors.right.isDown) {
    this.nextDirection = { x: 1, y: 0 };
  }

  if (this.cursors.up.isDown) {
    this.nextDirection = { x: 0, y: -1 };
  }

  if (this.cursors.down.isDown) {
    this.nextDirection = { x: 0, y: 1 };
  }
}

handleMovement() {
  const body = this.sprite.body;

  // ✅ si aucune input → ne pas bouger
  if (this.nextDirection.x === 0 && this.nextDirection.y === 0) {
    body.setVelocity(0, 0);
    return;
  }

  // ✅ appliquer direction
  this.currentDirection = this.nextDirection;

  body.setVelocity(
    this.currentDirection.x * this.speed,
    this.currentDirection.y * this.speed
  );
}



update() {
  this.readInput();
  this.handleMovement();
  
// rotation basique selon direction
if (this.currentDirection.x > 0) this.sprite.rotation = 0;
else if (this.currentDirection.x < 0) this.sprite.rotation = Math.PI;
else if (this.currentDirection.y < 0) this.sprite.rotation = -Math.PI / 2;
else if (this.currentDirection.y > 0) this.sprite.rotation = Math.PI / 2;

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