![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Scooter Project

You are a Software Engineer for the city of Baltimore. You have been asked to design, test, and write the back end for an electric scooter hire app. You won't need to design the front end.

You will need to:

1. Create UML class diagrams for the app.
2. Write tests for the classes.
3. Write the classes.

You are encouraged to practice test-driven development (TDD), but you can write the code first if you prefer.

## Getting Started

1. [Create a new repository using this template](https://github.com/new?template_name=scooter-project&template_owner=MultiverseLearningProducts&name=scooter-project&description=An%20electric%20scooter%20hire%20app%20created%20using%20UML%2C%20TDD%2C%20and%20OOP.).
2. Clone your new repository.
3. Open your new repository in Visual Studio Code.
4. [Open a terminal window in Visual Studio Code](https://code.visualstudio.com/docs/terminal/basics).
5. Run `npm install` to install the dependencies.
6. Run `npm test` to run the tests.

All of the tests are skipped by default:

```js
it.skip("rents a scooter out to a user", () => {});
```

When you are ready to try a test, replace `it.skip()` with `it()`:

```js
it("rents a scooter out to a user", () => {
  // your test code here
});
```

This way you can focus on a single test at a time.

## Project Specifications

You should refer back to these specs as you create your UML class diagrams, tests, and classes.

### Class: `Scooter`

This class represents a scooter that a user can rent from a station. A `Scooter` is either docked at a station or checked out to a user. A scooter can also be broken or need charging.

The `Scooter` class should have a **static** `Scooter.nextSerial` property. This should start at `1` and increment each time a new scooter is created.

Each scooter object should have the following properties:

| Property   | Type           | Description                                                   |
| ---------- | -------------- | ------------------------------------------------------------- |
| `station`  | `string\|null` | the station the scooter is docked at or `null` if checked out |
| `user`     | `User\|null`   | the user who checked out the scooter or `null` if docked      |
| `serial`   | `number`       | a number assigned sequentially from `Scooter.nextSerial`      |
| `charge`   | `number`       | a number from `0` (no charge at all) to `100` (fully charged) |
| `isBroken` | `boolean`      | `true` if the scooter is broken or `false` if not             |

- All scooters are docked, charged, and in good repair initially.
- The constructor has one parameter: the `station` the scooter is docked at.
- The constructor should initialize all of the other properties too.

Each scooter object should have the following methods:

#### `rent(user)`

- If the scooter is charged above 20% and not broken, remove it from its station and check it out to a user.
- Otherwise, throw an error because the scooter needs to charge or be repaired.

#### `dock(station)`

- Return the scooter to the station.
- Be sure to clear out the user so they don’t get charged unfairly.

#### `charge()`

- Fully charge the scooter.
- As an optional bonus, can you figure out how to do this incrementally?

#### `repair()`

- Repair the scooter.
- As an optional bonus, can you figure out how to make this take 5 seconds?

### Class: `User`

When a new person downloads the app and registers, a new user object is created to store their information.

Each user object has the following properties:

| Property     | Type      | Description                                       |
| ------------ | --------- | ------------------------------------------------- |
| `username`   | `string`  | the user's username                               |
| `password`   | `string`  | the user's password                               |
| `age`        | `number`  | the user's age in years                           |
| `isLoggedIn` | `boolean` | `true` if the user is logged in or `false` if not |

- The `username`, `password`, and `age` are provided to the constructor as arguments.
- A user is **not** logged in when they first register.

Each user object has the following methods:

#### `login(password)`

- If password is correct, logs the user in.
- If not, throws an incorrect password error.

#### `logout()`

- Logs the user out.

### Class: `ScooterApp`

The `ScooterApp` class keeps track of all registered users, plus all the scooters and their status. Many `ScooterApp` methods represent user actions such as logging in or returning a scooter. The `ScooterApp` uses properties and methods of scooter and user objects.

The `ScooterApp` class should include the following **static** properties:

| Property                     | Type     | Description                                                               |
| ---------------------------- | -------- | ------------------------------------------------------------------------- |
| `ScooterApp.stations`        | `object` | An object whose keys are stations and whose values are arrays of scooters |
| `ScooterApp.registeredUsers` | `object` | An object whose keys are usernames and whose values are users             |

- You can hard-code the stations in the constructor.
- There should be at least three stations.
- Initially, there are no scooters at any stations.

The `ScooterApp` class should include the following **static** methods:

#### `ScooterApp.registerUser(username, password, age)`

- If the user is not already registered AND is 18 or older, then add them as a new registered user. Log to the console that the `user has been registered` and return the user.
- If the user cannot be registered, throw an error: `already registered` or `too young to register`.

#### `ScooterApp.loginUser(username, password)`

- Locate the registered user by name and call its login method. Log to the console that the `user has been logged in`.
- If the user cannot be located or if the password is incorrect, then throw an error: `Username or password is incorrect`.

#### `ScooterApp.logoutUser(username)`

- Locate the registered user and call its logout method. Log `user is logged out` to the console.
- If the user cannot be located, throw `no such user is logged in` error

#### `ScooterApp.createScooter(station)`

- This method is called by the Scooter company’s home office when new scooters are deployed.
- Create a new scooter, add it to the station’s scooter list, and set its station property. Log `created new scooter` to the console. Return the scooter.
- Throws `no such station` error if the station does not exist.

#### `ScooterApp.dockScooter(scooter, station)`

- Add the scooter to the station’s scooter list, and dock it.
- Log `scooter is docked` to the console.
- Throws `no such station` error if the station does not exist.
- Throws `scooter already at station` error if the scooter is already there.

#### `ScooterApp.rentScooter(scooter, user)`

- Locate the given scooter at one of the stations, and remove it from that station. Rent it to the user. Log `scooter is rented` to the console.
- If the scooter is already rented, throw the error `scooter already rented`.

#### `ScooterApp.print()`

- You will use this handy method when testing your `ScooterApp`.
- Log the list of registered users to the console.
- Log the list of stations and how many scooters are at each station to the console.
- Take a moment to format it nicely so you can read it.
