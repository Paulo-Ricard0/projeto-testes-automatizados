const User = require("../../../src/schemas/User");
const UserService = require("../../../src/services/user-service");

describe("[Integration] User Service tests", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should return true if user exists and password matches", async () => {
    const mockUser = { email: "paulo@gmail.com", password: "12345" };
    jest.spyOn(User, "findOne").mockResolvedValue(mockUser);

    const result = await UserService.userExistsAndCheckPassword(
      mockUser.email,
      mockUser.password
    );

    expect(result).toBe(true);
  });

  test("Should return false if the user does not exist", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);

    const result = await UserService.userExistsAndCheckPassword(
      "any@gmail.com",
      "password123"
    );

    expect(result).toBe(false);
  });

  test("should throw an error if password does not match", async () => {
    const mockUser = { email: "paulo@gmail.com", password: "12345" };
    jest.spyOn(User, "findOne").mockResolvedValue(mockUser);

    await expect(
      UserService.userExistsAndCheckPassword(mockUser.email, "password123")
    ).rejects.toEqual({ status: 400, message: "As senhas não batem" });
  });
});
