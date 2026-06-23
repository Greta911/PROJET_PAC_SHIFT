import Phaser from 'phaser';
import Player from '../entities/Player.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
  // === GROUPES ===
  this.walls = this.physics.add.staticGroup();

  // === MAP (1 = mur, 0 = vide)
  const map = [
    "111111111111",
    "100000000001",
    "101111110101",
    "100000000001",
    "111011111101",
    "100000000001",
    "111111111111"
  ];

  const tileSize = 32;

  // === GENERATION DU LABYRINTHE ===
  map.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (cell === "1") {
        const wall = this.add.rectangle(
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize,
          0x2222ff
        ).setOrigin(0);

        this.physics.add.existing(wall, true);
        this.walls.add(wall);
      }
    });
  });

  // === JOUEUR ===
  this.player = new Player(this, 64, 64);

  // ✅ COLLISION PLAYER ↔ WALLS
  this.physics.add.collider(this.player, this.walls);
}

  update() {
    this.player.update();
  }
}
