const Scooter = require("./Scooter.js");
const User = require("./User.js");

class ScooterApp {
  static registeredUsers = {};
  static stations = {};

  static registerUser(username, password, age) {
    if (age < 18) {
      throw new Error("too young to register");
    }
    if (ScooterApp.registeredUsers.hasOwnProperty(username)) {
      throw new Error("already registered");
    }
    let newUser = new User(username, password, age);
    ScooterApp.registeredUsers[username] = newUser;
    return newUser;
  }

  static loginUser(username, password) {
    if (!ScooterApp.registeredUsers.hasOwnProperty(username)) {
      throw new Error("Username or password is incorrect.");
    }
    if (ScooterApp.registeredUsers[username].getPassword() === password) {
      ScooterApp.registeredUsers[username].isLoggedIn = true;
      console.log("user has been logged in");
    } else {
      throw new Error("Username or password is incorrect.");
    }
  }

  static logoutUser(username) {
    if (!ScooterApp.registeredUsers.hasOwnProperty(username)) {
      throw new Error("No such user is registered.");
    }

    const user = ScooterApp.registeredUsers[username];

    if (!user.isLoggedIn) {
      throw new Error("User is not logged in.");
    }

    user.isLoggedIn = false;
    console.log("user has been logged out");
  }

  static createScooter(station) {
    if (ScooterApp.stations.hasOwnProperty(station)) {
      ScooterApp.stations[station].push(new Scooter(station));
    } else {
      throw new Error("no such station");
    }
  }

  static dockScooter(scooter, station) {
    if (!ScooterApp.stations.hasOwnProperty(station)) {
      throw new Error("no such station");
    }
    if (ScooterApp.stations[station].find((s) => s === scooter)) {
      throw new Error("scooter already at station");
    }
    ScooterApp.stations[station].push(scooter);
    console.log("scooter is docked");
  }

  static rentScooter(scooter, user) {
    if (!ScooterApp.registeredUsers.hasOwnProperty(user)) {
      throw new Error("Invalid user");
    }

    let foundScooter = null;
    let stationName = null;

    for (let station in ScooterApp.stations) {
      let stationScooters = ScooterApp.stations[station];
      foundScooter = stationScooters.find((s) => s === scooter);
      if (foundScooter) {
        stationName = station;
        break;
      }
    }

    if (!foundScooter) {
      throw new Error("Scooter is already rented");
    }

    foundScooter.station = null;
    foundScooter.user = user;
    ScooterApp.stations[stationName] = ScooterApp.stations[stationName].filter(
      (s) => s !== scooter
    );
    console.log("Scooter is rented");
  }

  static print() {
    for (let user in ScooterApp.registeredUsers) {
      console.log(user);
    }
    for (let station in ScooterApp.stations) {
      let scooters = ScooterApp.stations[station];
      console.log(`${station}: ${scooters.length} scooter(s)`);
    }
  }
}

module.exports = ScooterApp;
