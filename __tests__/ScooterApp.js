const { describe, expect, it, beforeEach } = require("@jest/globals");
const ScooterApp = require("../classes/ScooterApp.js");
const Scooter = require("../classes/Scooter.js");

beforeEach(() => {
  ScooterApp.registeredUsers = {};
  ScooterApp.registerUser("user1", "p@ssword1", 32);
  ScooterApp.registerUser("user2", "p@ssword2", 45);
  ScooterApp.registerUser("user3", "p@ssword3", 23);
  ScooterApp.stations = { "London Bridge": [], "Kings Cross": [] };
});

describe("ScooterApp.registerUser(username, password, age)", () => {
  it("registers a new user if old enough", () => {
    ScooterApp.registerUser("Bobby", "p@ssword", 32);
    expect(ScooterApp.registeredUsers).toHaveProperty("Bobby");
  });

  it("throws an error if too young or already registered", () => {
    expect(() => {
      ScooterApp.registerUser("Lucy", "p@ssword1", 17);
    }).toThrow(Error("too young to register"));
    expect(() => {
      ScooterApp.registerUser("user1", "p@ssword1", 32);
    }).toThrow(Error("already registered"));
  });
});

describe("ScooterApp.loginUser(username, password)", () => {
  it("logs in a registered user", () => {
    ScooterApp.loginUser("user1", "p@ssword1");
    expect(ScooterApp.registeredUsers["user1"].isLoggedIn).toBe(true);
  });

  it("throws an error if user not found or password incorrect", () => {
    expect(() => {
      ScooterApp.loginUser("user4", "p@ssword2");
    }).toThrow(Error("Username or password is incorrect."));
    expect(() => {
      ScooterApp.loginUser("user2", "password2");
    }).toThrow(Error("Username or password is incorrect."));
  });
});

describe("ScooterApp.logoutUser(username)", () => {
  it("logs out a registered user", () => {
    ScooterApp.loginUser("user1", "p@ssword1");
    ScooterApp.logoutUser("user1");
    expect(ScooterApp.registeredUsers["user1"].isLoggedIn).toBe(false);
  });

  it("throws an error if user not found", () => {
    expect(() => {
      ScooterApp.logoutUser("unknownUser");
    }).toThrow(Error("No such user is registered."));
  });

  it("throws an error if user is already logged out", () => {
    expect(() => {
      ScooterApp.logoutUser("user1");
    }).toThrow(Error("User is not logged in."));
  });
});

describe("ScooterApp.createScooter(station)", () => {
  it("creates a new scooter and adds it to ScooterApp.stations", () => {
    const initialCount = ScooterApp.stations["London Bridge"].length;
    ScooterApp.createScooter("London Bridge");

    expect(ScooterApp.stations["London Bridge"].length).toBe(initialCount + 1);

    const newScooter = ScooterApp.stations["London Bridge"][initialCount];

    expect(newScooter.station).toBe("London Bridge");
  });

  it("throws an error if a station does not exist", () => {
    expect(() => {
      ScooterApp.createScooter("Paddington");
    }).toThrow(Error("no such station"));
  });
});

describe("ScooterApp.dockScooter(scooter, station)", () => {
  let scooter1;
  let scooter2;

  beforeEach(() => {
    scooter1 = new Scooter("London Bridge");
    scooter2 = new Scooter("London Bridge");
  });

  it("docks a scooter at a station", () => {
    ScooterApp.dockScooter(scooter1, "London Bridge");
    expect(ScooterApp.stations["London Bridge"]).toContain(scooter1);
  });

  it("throws an error if a station does not exist", () => {
    expect(() => {
      ScooterApp.dockScooter(scooter2, "Paddington");
    }).toThrow(Error("no such station"));
  });

  it("throws an error if a scooter is already at a station", () => {
    ScooterApp.dockScooter(scooter1, "London Bridge");
    expect(() => {
      ScooterApp.dockScooter(scooter1, "London Bridge");
    }).toThrow(Error("scooter already at station"));
  });
});

describe("ScooterApp.rentScooter(scooter, user)", () => {
  let scooter1;
  let scooter2;

  beforeEach(() => {
    scooter1 = new Scooter("London Bridge");
    scooter2 = new Scooter("London Bridge");
    ScooterApp.dockScooter(scooter1, "London Bridge");
    ScooterApp.dockScooter(scooter2, "London Bridge");
  });

  it("rents a scooter out to a user", () => {
    ScooterApp.rentScooter(scooter1, "user1");
    expect(scooter1.user).toBe("user1");
    expect(scooter1.station).toBeNull();
  });

  it("throws an error if a scooter is already rented", () => {
    expect(() => {
      ScooterApp.rentScooter(scooter1, "user1");
      ScooterApp.rentScooter(scooter1, "user2");
    }).toThrow(Error("Scooter is already rented"));
  });

  it("throws an error if the user is not registered", () => {
    expect(() => {
      ScooterApp.rentScooter(scooter1, "user4");
    }).toThrow(Error("Invalid user"));
  });
});
