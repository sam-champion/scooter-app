const { describe, expect, it } = require("@jest/globals");
const User = require("../classes/User.js");

let user1;

beforeEach(() => {
  user1 = new User("Bobby", "p@ssword", 32);
});

describe("user.login(password)", () => {
  it("logs a user in if the password is correct", () => {
    user1.login("p@ssword");
    expect(user1.isLoggedIn).toBe(true);
  });

  it("throws an error if the password is incorrect", () => {
    expect(() => {
      user1.login("password");
    }).toThrow("Incorrect password");
  });
});

describe("user.logout()", () => {
  it("logs a user out", () => {
    user1.logout();
    expect(user1.isLoggedIn).toBe(false);
  });
});
