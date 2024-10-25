class Scooter {
  static #nextSerial = 0;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.#nextSerial;
    this.charge = 100;
    this.isBroken = false;
    Scooter.#nextSerial++;
  }

  rent(user) {
    if (this.charge > 20) {
      if (this.isBroken === false) {
        this.user = user;
        this.station = null;
      } else {
        throw new Error("Scooter needs to be repaired.");
      }
    } else {
      throw new Error("Scooter needs to charge.");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    console.log("Starting charge");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.charge = 100;
    console.log("Charge complete");
  }

  async repair() {
    console.log("Starting repair");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.isBroken = false;
    console.log("Repair complete");
  }
}

module.exports = Scooter;
