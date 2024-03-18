require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../../src/schemas/User");
const app = require("../../src/app");

describe("[e2e] Create user tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Should return status 200 when a new user is created", async () => {
    const res = await request(app).post("/user").send({
      name: "Paulo",
      email: "pauloe2e@gmail.com",
      password: "12345",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  test("Should return status 400 when the email is invalid", async () => {
    const res = await request(app).post("/user").send({
      name: "Paulo",
      email: "paulo@.com",
      password: "12345",
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual("Email inválido");
  });

  test("Should return status 400 if password is invalid", async () => {
    const res = await request(app).post("/user").send({
      name: "Paulo",
      email: "paulo@gmail.com",
      password: "",
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual("Senha inválida");
  });
});
