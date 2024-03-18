require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../../src/schemas/User");
const UserController = require("../../../src/controllers/user-ctrl");
const { req, res } = require("../../mocks/user-mock");
const UserService = require("../../../src/services/user-service");

describe("[Integration] User Controller tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("Should create a new user with status 200", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await UserController.create(req.success, res);

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy.mock.calls[0][0]).toHaveProperty("id");
  });

  test("Should throw status code 400 if email is invalid", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await UserController.create(req.invalidEmail, res);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Email inválido");
  });

  test("Should throw status code 400 if password is invalid", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await UserController.create(req.invalidPassword, res);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Senha inválida");
  });

  test("Should throw status code 200 for password change", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await UserController.changePassword(req.success, res);

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith({ message: "ok" });
  });

  test("should return 500 status with message 'Server Error' when an unhandled error occurs", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    jest.spyOn(UserService, "createUser").mockImplementation(() => {
      throw new Error();
    });

    await UserController.create(req.success, res);

    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Server Error");
  });
});
