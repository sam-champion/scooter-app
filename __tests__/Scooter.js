const { describe, expect, it } = require("@jest/globals");
const Scooter = require("../classes/Scooter.js");
const User = require("../classes/User.js");

let scooter1;
let user1;

beforeEach(() => {
  scooter1 = new Scooter("London Bridge");
  user1 = new User("Bobby", "p@ssword", 32);
});

describe("scooter.rent(user)", () => {
  it("checks a scooter out to a user", () => {
    scooter1.rent(user1);
    expect(scooter1.user).toBe(user1);
  });

  it("throws an error if battery dead or scooter broken", () => {
    scooter1.isBroken = true;
    expect(() => {
      scooter1.rent(user1);
    }).toThrow("Scooter needs to be repaired.");

    scooter1.charge = 20;
    expect(() => {
      scooter1.rent(user1);
    }).toThrow("Scooter needs to charge.");
  });
});

describe("scooter.dock(station)", () => {
  it("returns a scooter to a station", () => {
    scooter1.rent(user1);
    scooter1.dock("Kings Cross");
    expect(scooter1.station).toBe("Kings Cross");
  });
});

describe("scooter.recharge()", () => {
  it("charges a scooter", async () => {
    await scooter1.recharge();
    expect(scooter1.charge).toBe(100);
  }, 10000);
});

describe("scooter.repair()", () => {
  it("repairs a scooter", async () => {
    await scooter1.repair();
    expect(scooter1.isBroken).toBe(false);
  }, 10000);
});
