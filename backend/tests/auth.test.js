import request from "supertest";
import app from "../src/app.js";

describe("Auth - Login", () => {
    test("Debe devolver un token al hacer login correctamente", async () => {
        const res = await request(app).post("/login").send({
            email: "admin@hotmail.com",
            password: "admin",
        });
        expect(res.status).toBe(200);
    }, 10000);
});
