class User {
  #password;
  #age;
  constructor(username, password, age) {
    this.username = username;
    this.#password = password;
    this.#age = age;
    this.isLoggedIn = false;
  }

  login(password) {
    if (password === this.#password) {
      this.isLoggedIn = true;
    } else {
      throw new Error("Incorrect password");
    }
  }

  logout() {
    this.isLoggedIn = false;
  }

  getAge() {
    return this.#age;
  }

  getPassword() {
    return this.#password;
  }
}

module.exports = User;
