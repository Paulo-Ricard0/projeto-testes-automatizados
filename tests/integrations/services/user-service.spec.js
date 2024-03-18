require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../../src/schemas/User");
const UserService = require("../../../src/services/user-service");

describe("[Integration] User Service tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await User.create({
      name: "Paulo",
      email: "paulo@gmail.com",
      password: "12345",
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("Should return true if user exists", async () => {
    const userExists = await UserService.userExistsAndCheckPassword(
      "paulo@gmail.com",
      "12345"
    );

    expect(userExists).toBe(true);
  });

  test("Should return false if the user does not exist", async () => {
    const userExists = await UserService.userExistsAndCheckPassword(
      "any@gmail.com",
      "12345"
    );

    expect(userExists).toBe(false);
  });
});
