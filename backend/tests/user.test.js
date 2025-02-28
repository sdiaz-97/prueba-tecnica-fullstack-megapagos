import request from "supertest";
import app from "../src/app.js";

describe("Usuarios - Endpoints", () => {
    let authToken;
    let userIduser;
    let userIdadmin;

    test("Debe devolver un token al hacer login correctamente", async () => {
        const res = await request(app).post("/login").send({
            email: "admin@hotmail.com",
            password: "admin",
        });
        authToken = res.body.data?.tokenjwt;
        expect(res.status).toBe(200);
    }, 10000);

    test("Debe obtener la lista de usuarios ", async () => {
        const res = await request(app)
            .get("/users?page=1&limit=10")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data.users)).toBe(true);
    });

    test("Debe crear un nuevo usuario simulando el registro", async () => {
        const res = await request(app).post("/users").send({
            name: "Test User",
            email: `testuser${Date.now()}@mail.com`,
            password: "testpassword",
            roleId: "Usuario",
            administradorId: 1,
        })
        userIduser = res.body.data.data.userId
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuario Creado!');
    });

    test("Debe crear un nuevo usuario simulando el panel del control de admin", async () => {
        const res = await request(app).post("/users").send({
            name: "Test User",
            email: `testuser${Date.now()}@gmail.com`,
            password: "testpassword",
            roleId: "Administrador",
            administradorId: 1,
        }).set("Authorization", `Bearer ${authToken}`);
        userIdadmin = res.body.data.data.userId
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuario Creado!');
    });


    test("Debe actualizar un usuario existente (requiere admin)", async () => {
        const res = await request(app)
            .put(`/users?id=${userIduser}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: "Updated User"
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Usuario actualizado correctamente.");
    });


    it("Debe eliminar un usuario (Usuario) (requiere admin)", async () => {
        const res = await request(app)
            .delete(`/users?id=${userIduser}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Usuario eliminado correctamente");
    });

    it("Debe eliminar un usuario (Admin) (requiere admin)", async () => {
        const res = await request(app)
            .delete(`/users?id=${userIdadmin}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Usuario eliminado correctamente");
    });
});
