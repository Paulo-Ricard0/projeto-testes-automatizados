exports.req = {
  success: {
    body: {
      name: "Paulo",
      email: "paulo@gmail.com",
      password: "123456",
    },
  },
  invalidEmail: {
    body: {
      name: "Paulo",
      email: "paulo@.com",
      password: "123456",
    },
  },
  invalidPassword: {
    body: {
      name: "Paulo",
      email: "paulo@gmail.com",
      password: undefined,
    },
  },
  userNotFound: {
    body: {
      email: "any@gmail.com",
      password: "12345",
    },
  },
  passwordIncorrect: {
    body: {
      email: "paulo@gmail.com",
      password: "teste",
    },
  },
  userExists: {
    email: "paulo@gmail.com",
    password: "12345",
  },
};

exports.res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(() => {}),
};
