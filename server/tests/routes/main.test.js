import app from "../../../app.js";
import request from "supertest";

describe("GET /api/dummydata", () => {
  it("should return list of products", async () => {
    return request(app)
      .get("/api/dummydata")
      .expect("Content-Type", /text/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});