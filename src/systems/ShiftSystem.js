export default class ShiftSystem {
  constructor(scene, player, wallCollider) {
    this.scene = scene;
    this.player = player;
    this.wallCollider = wallCollider;

    // état
    this.active = false;

    // ✅ jauge
    this.maxCharge = 100;
    this.charge = 0;

    // paramètres
    this.cost = 100;       // coût pour activer
    this.duration = 2000;  // durée effet
  }

  tryActivate() {
    // ❌ pas assez de charge
    if (this.active || this.charge < this.cost) return;

    this.activate();
  }

  activate() {
    this.active = true;
    this.scene.triggerShiftFX();

    // consomme toute la jauge
    this.charge = 0;

    // désactiver collision murs
    this.wallCollider.active = false;

    this.player.setFillStyle(0x00ffff);

    this.scene.time.delayedCall(this.duration, () => {
      this.deactivate();
    });
  }

  deactivate() {
    this.active = false;

    this.wallCollider.active = true;

    this.player.setFillStyle(0xffff00);
  }

  // ✅ recharge par pastille
  addCharge(amount) {
    this.charge = Math.min(this.charge + amount, this.maxCharge);
  }

  // ✅ pour debug/affichage
  getRatio() {
    return this.charge / this.maxCharge;
  }
}
