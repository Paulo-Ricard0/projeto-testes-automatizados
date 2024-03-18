const SessionController = require("../../../src/controllers/session-ctrl");
const SessionService = require("../../../src/services/session-service");
const UserService = require("../../../src/services/user-service");
const Email = require("../../../src/utils/email-validator");
const { req, res } = require("../../mocks/http-mocks");

const SessionServiceMock = {
  generateToken: () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  },
};

describe("Session Controller tests", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Should return a status of 200 for a new session created", async () => {
    jest.spyOn(Email, "isValid").mockImplementationOnce(() => true);

    jest
      .spyOn(UserService, "userExistsAndCheckPassword")
      .mockImplementationOnce(() => true);

    jest
      .spyOn(SessionService, "generateToken")
      .mockImplementationOnce(SessionServiceMock.generateToken);

    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await SessionController.create(req.success, res);

    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalled();
    const tokenReturned = jsonSpy.mock.calls[0][0].token;
    expect(tokenReturned).toBe(SessionServiceMock.generateToken());
  });

  test("Should return a 400 status with the message 'Email inválido'", async () => {
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await SessionController.create(req.invalidEmail, res);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Email inválido");
  });

  test("Should return a 400 status with the message 'Senha inválida'", async () => {
    jest.spyOn(Email, "isValid").mockImplementationOnce(() => true);

    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await SessionController.create(req.invalidPassword, res);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Senha inválida");
  });

  test("should return 404 status with message 'Usuário não encontrado' when user does not exist", async () => {
    jest.spyOn(Email, "isValid").mockImplementationOnce(() => true);

    const userExistsAndCheckPasswordSpy = jest.spyOn(
      UserService,
      "userExistsAndCheckPassword"
    );

    userExistsAndCheckPasswordSpy.mockResolvedValue(false);

    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await SessionController.create(req.userNotFound, res);

    expect(userExistsAndCheckPasswordSpy).toHaveBeenCalledWith(
      "any@gmail.com",
      "12345"
    );
    expect(statusSpy).toHaveBeenCalledWith(404);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Usuário não encontrado");
  });

  test("should return 500 status with message 'Server Error' when an unhandled error occurs", async () => {
    jest.spyOn(Email, "isValid").mockImplementationOnce(() => true);

    jest
      .spyOn(UserService, "userExistsAndCheckPassword")
      .mockImplementationOnce(() => true);

    jest.spyOn(SessionService, "generateToken").mockImplementation(() => {
      throw new Error();
    });

    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await SessionController.create(req.success, res);

    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalled();
    expect(jsonSpy).toHaveBeenCalledWith("Server Error");
  });
});
