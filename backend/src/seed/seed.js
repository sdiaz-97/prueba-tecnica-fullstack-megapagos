import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  // 1. Crear roles (Administrador, Empleado)
  await prisma.role.createMany({
    data: [
      { name: "Administrador" },
      { name: "Empleado" },
    ],
    skipDuplicates: true,  // Evita error si ya existen
  });
  console.log("Roles iniciales insertados correctamente.");

  // 2. Verificar si ya existe el usuario administrador
  const adminEmail = "admin@hotmail.com";
  let adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash("admin", saltRounds);
    adminUser = await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        password: hashedPassword,
        role: {
          connect: { name: "Administrador" },
        },
      },
    });
    console.log("Usuario administrador creado correctamente.");
  } else {
    console.log("El usuario administrador ya existe.");
  }

  // 3. Crear un usuario "normal" asignado al administrador
  const normalUserEmail = "user@hotmail.com";
  let normalUser = await prisma.user.findUnique({
    where: { email: normalUserEmail },
  });

  if (!normalUser) {
    const hashedPassword = await bcrypt.hash("user", saltRounds);
    normalUser = await prisma.user.create({
      data: {
        name: "Usuario",
        email: normalUserEmail,
        password: hashedPassword,
        role: {
          connect: { name: "Empleado" },
        },
        // Asigna el usuario normal al administrador creado
        administrador: {
          connect: { id: adminUser.id },
        },
      },
    });
    console.log("Usuario normal creado correctamente.");
  } else {
    console.log("El usuario normal ya existe.");
  }

  // 4. Crear (o encontrar) un proyecto del administrador
  const projectName = "Proyecto de Prueba";
  let project = await prisma.project.findFirst({
    where: { name: projectName },
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: projectName,
        description: "Este es un proyecto de prueba.",
        // Conecta al administrador como dueño del proyecto
        admin: {
          connect: { id: adminUser.id },
        },
      },
    });
    console.log("Proyecto creado correctamente.");
  } else {
    console.log("El proyecto ya existe.");
  }

  // 5. Asignar el usuario normal al proyecto (UserProject)
  const userProjectExists = await prisma.userProject.findUnique({
    where: {
      userId_projectId: {
        userId: normalUser.id,
        projectId: project.id,
      },
    },
  });

  if (!userProjectExists) {
    await prisma.userProject.create({
      data: {
        userId: normalUser.id,
        projectId: project.id,
      },
    });
    console.log("Usuario asignado al proyecto correctamente.");
  } else {
    console.log("El usuario ya está asignado a este proyecto.");
  }
}

main()
  .catch((e) => {
    console.error("Error en la inserción de datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
