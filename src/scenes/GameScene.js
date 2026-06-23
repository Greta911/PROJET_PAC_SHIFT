import Phaser from 'phaser';
import Player from '../entities/Player.js';
import Ghost from '../entities/Ghost.js';
import ShiftSystem from '../systems/ShiftSystem.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
  // === GROUPES ===
  this.walls = this.physics.add.staticGroup();
  this.add.rectangle(0, 0, 1, 1, 0xffffff).setVisible(false);

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
  
  // === GHOST ===
this.ghost = new Ghost(this, 300, 160, this.player);


  // ✅ COLLISION PLAYER ↔ WALLS
  // collision player ↔ murs (on garde la référence)
this.playerWallCollider = this.physics.add.collider(this.player, this.walls);

// ghost ↔ murs
this.physics.add.collider(this.ghost, this.walls);

// overlap player ↔ ghost
this.physics.add.overlap(
  this.player,
  this.ghost,
  this.onPlayerHit,
  null,
  this
);

// === INPUT SHIFT
this.shiftKey = this.input.keyboard.addKey(
  Phaser.Input.Keyboard.KeyCodes.SPACE
);

// ✅ INIT SYSTEM SHIFT
this.shiftSystem = new ShiftSystem(
  this,
  this.player,
  this.playerWallCollider
);

// collisions avec murs
this.physics.add.collider(this.ghost, this.walls);

// collision joueur ↔ fantôme
this.physics.add.overlap(
  this.player,
  this.ghost,
  this.onPlayerHit,
  null,
  this
);
}


onPlayerHit() {
  this.scene.restart(); // reset immédiat (MVP)
}

  
update() {
  this.player.update();
  this.ghost.update();

  
// input SHIFT → système
  if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
    this.shiftSystem.tryActivate();
  }

}
}
