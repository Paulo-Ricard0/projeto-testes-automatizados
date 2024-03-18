exports.req = {
  success: {
    body: {
      email: "paulo@gmail.com",
      password: "123456",
    },
  },
  invalidEmail: {
    body: {
      email: "paulo@.com",
      password: "123456",
    },
  },
  invalidPassword: {
    body: {
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
};

exports.res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(() => {}),
};
