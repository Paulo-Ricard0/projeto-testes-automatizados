require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../../src/schemas/User");
const app = require("../../src/app");

describe("[e2e] Create session tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await request(app).post("/user").send({
      name: "Paulo",
      email: "integration@gmail.com",
      password: "12345",
    });
  });

  test("Should return status 200 when a new session is created", async () => {
    const res = await request(app).post("/session").send({
      email: "integration@gmail.com",
      password: "12345",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Should return status 404 if user does not exist", async () => {
    const res = await request(app).post("/session").send({
      email: "any@gmail.com",
      password: "12345",
    });

    expect(res.status).toBe(404);
    expect(res.body).toEqual("Usuário não encontrado");
  });
});
