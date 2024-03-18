const Email = require("../../../src/utils/email-validator");

describe("Email validator tests", () => {
  test("Should return true if the email is valid", () => {
    const isValidEmail = Email.isValid("paulobrfc@gmail.com");
    expect(isValidEmail).toBe(true);
  });

  test("Should return false if the email does not exist", () => {
    const isValidEmail = Email.isValid(undefined);
    expect(isValidEmail).toBe(false);
  });

  test("Should return false if the email is invalid", () => {
    const isValidEmail = Email.isValid("paulo@.com");
    expect(isValidEmail).toBe(false);
  });

  test("Should return false if email is empty", () => {
    const isValidEmail = Email.isValid("");
    expect(isValidEmail).toBe(false);
  });
});
