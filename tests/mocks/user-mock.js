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
};

exports.res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(() => {}),
};
