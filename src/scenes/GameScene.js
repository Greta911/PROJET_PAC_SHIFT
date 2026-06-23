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
  // === PELLETS ===
this.pellets = this.physics.add.staticGroup();

// === FLASH SCREEN (SHIFT FX)
this.flash = this.add.rectangle(
  0,
  0,
  this.scale.width,
  this.scale.height,
  0x00ffff,
  0
).setOrigin(0).setDepth(10);


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

  // === GENERATION DU LABYRINTHE ===

const mapWidthTiles = map[0].length;
const mapHeightTiles = map.length;

const tileSize = Math.floor(
  Math.min(
    this.scale.width / mapWidthTiles,
    this.scale.height / mapHeightTiles
  )
);

const mapWidth = mapWidthTiles * tileSize;
const mapHeight = mapHeightTiles * tileSize;

// centre de la scène
const offsetX = (this.scale.width - mapWidth) / 2;
const offsetY = (this.scale.height - mapHeight) / 2;


map.forEach((row, y) => {
  row.split('').forEach((cell, x) => {
    const worldX = offsetX + x * tileSize;
    const worldY = offsetY + y * tileSize;

    if (cell === "1") {
      const wall = this.add.rectangle(
        worldX,
        worldY,
        tileSize,
        tileSize,
        0x2222ff
      ).setOrigin(0);

      this.physics.add.existing(wall, true);
      this.walls.add(wall);

    } else {
      const pellet = this.add.circle(
        worldX + tileSize / 2,
        worldY + tileSize / 2,
        4,
        0xffffff
      );

      this.physics.add.existing(pellet, true);
      this.pellets.add(pellet);
    }
  });
});

//==========BRAND==========
this.add.text(this.scale.width / 2, 10, 'PAC//SHIFT', {
  fontSize: '16px',
  color: '#00ffff'
}).setOrigin(0.5, 0);


//======SCORE=======

this.score = 0;

this.scoreText = this.add.text(10, this.scale.height - 20, 'Score: 0', {
  fontSize: '14px',
  color: '#ffffff'
});


  // === JOUEUR ===

const spawn = this.getFreeTilePosition(map, offsetX, offsetY, tileSize);

this.player = new Player(this, spawn.x, spawn.y, tileSize);

// === GHOST ===
const ghostSpawn = this.getFarSpawn(
  map,
  offsetX,
  offsetY,
  tileSize,
  spawn.x,
  spawn.y
);

this.ghost = new Ghost(
  this,
  ghostSpawn.x,
  ghostSpawn.y,
  this.player,
  tileSize
);

  // ✅ COLLISION PLAYER ↔ WALLS
  // collision player ↔ murs (on garde la référence)
this.playerWallCollider = this.physics.add.collider(this.player.sprite, this.walls);

// ghost ↔ murs
this.physics.add.collider(this.ghost.sprite, this.walls);

// overlap player ↔ ghost

this.physics.add.overlap(
  this.player.sprite,
  this.ghost.sprite,
  this.onPlayerHit,
  null,
  this
);


this.physics.add.overlap(
  this.player.sprite,
  this.pellets,
  this.collectPellet,
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


// === UI SHIFT (simple barre)
this.shiftBarBg = this.add.rectangle(10, 10, 104, 10, 0x222222).setOrigin(0);
this.shiftBar = this.add.rectangle(12, 12, 100, 6, 0x00ffff).setOrigin(0);

}

getFreeTilePosition(map, offsetX, offsetY, tileSize) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "0") {
        return {
          x: offsetX + x * tileSize + tileSize / 2,
          y: offsetY + y * tileSize + tileSize / 2
        };
      }
    }
  }
}

getFarSpawn(map, offsetX, offsetY, tileSize, playerX, playerY) {
  let best = null;
  let maxDist = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "0") {
        const wx = offsetX + x * tileSize + tileSize / 2;
        const wy = offsetY + y * tileSize + tileSize / 2;

        const dist = Phaser.Math.Distance.Between(wx, wy, playerX, playerY);

        if (dist > maxDist) {
          maxDist = dist;
          best = { x: wx, y: wy };
        }
      }
    }
  }

  return best;
}
collectPellet(player, pellet) {
  pellet.destroy();

  this.shiftSystem.addCharge(20);

  this.score += 10;
  this.scoreText.setText('Score: ' + this.score);

  if (this.pellets.countActive(true) === 0) {
    this.onWin();
  }
}


onWin() {
  this.player.setFillStyle(0x00ff00); // vert

  this.time.delayedCall(500, () => {
    this.scene.restart();
  });
}

onPlayerHit() {
  // freeze rapide
  this.physics.pause();

  // feedback visuel
  this.player.setFillStyle(0xff0000);

  // petit flash rouge
  this.cameras.main.flash(200, 255, 0, 0);

  // restart rapide (MVP pacing)
  this.time.delayedCall(400, () => {
    this.scene.restart();
  });
}

triggerShiftFX() {
  // ✅ FLASH
  this.flash.setAlpha(0.6);
  this.cameras.main.flash(150, 0, 255, 255);
  this.tweens.add({
    targets: this.flash,
    alpha: 0,
    duration: 200,
    ease: 'Linear'
  });

  // ✅ SHAKE
  this.cameras.main.shake(150, 0.01);

  // ✅ MURS (VERSION 100% SAFE)
this.walls.getChildren().forEach(wall => {
  wall.setFillStyle(0x00ffff);
});

this.time.delayedCall(200, () => {
  this.walls.getChildren().forEach(wall => {
    wall.setFillStyle(0x2222ff);
  });
});

}

  
update() {
  
if (!this.physics.world.isPaused) {
  this.player.update();
  this.ghost.update();
}


  
// input SHIFT → système
  if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
    this.shiftSystem.tryActivate();
  }

  
// update jauge
const ratio = this.shiftSystem.getRatio();
this.shiftBar.width = 100 * ratio;

}
}
