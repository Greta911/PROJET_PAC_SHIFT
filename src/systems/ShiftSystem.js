export default class ShiftSystem {
  constructor(scene, player, wallCollider) {
    this.scene = scene;
    this.player = player;
    this.wallCollider = wallCollider;

    this.active = false;
    this.duration = 2000; // durée en ms
  }

  tryActivate() {
    if (this.active) return;

    this.activate();
  }

  activate() {
    this.active = true;

    // ✅ Désactiver UNIQUEMENT collision player ↔ walls
    if (this.wallCollider) {
      this.wallCollider.active = false;
    }

    // feedback visuel minimal (CDC)
    this.player.setFillStyle(0x00ffff);

    this.scene.time.delayedCall(this.duration, () => {
      this.deactivate();
    });
  }

  deactivate() {
    this.active = false;

    if (this.wallCollider) {
      this.wallCollider.active = true;
    }

    this.player.setFillStyle(0xffff00);
  }
}