import request from "supertest";
import app from "../src/app";

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: { verify: jest.fn() },
  JsonWebTokenError: class extends Error {},
}));

jest.mock("pino", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  })),
}));

describe("application HTTP behavior", () => {
  it("reports that the service is running", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "success",
      message: "Service is running",
    });
    expect(new Date(response.body.timestamp).toISOString()).toBe(
      response.body.timestamp
    );
  });

  it("returns a descriptive response for an unknown route", async () => {
    const response = await request(app).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Cannot GET /missing",
    });
  });

  it("rejects malformed JSON request bodies", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .set("Content-Type", "application/json")
      .send('{"email":');

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Invalid JSON format in request body",
    });
  });

  it("validates user registration input before accessing persistence", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: "error",
      message: "Validation failed",
    });
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "externalIds",
          message: "Required",
        }),
      ])
    );
  });
});
