const jwt = require("jsonwebtoken");
const SessionService = require("../../../src/services/session-service");

describe("SessionService", () => {
  beforeAll(() => {
    process.env.SECRET_KEY = "testSecretKey";
  });

  test("Should generate a valid token with the correct email", () => {
    const email = "test@gmail.com";
    const token = SessionService.generateToken({ email });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    expect(decoded.email).toBe(email);
  });

  afterAll(() => {
    delete process.env.SECRET_KEY;
  });
});
