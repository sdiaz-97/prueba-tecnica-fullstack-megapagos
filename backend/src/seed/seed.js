import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  await prisma.role.createMany({
    data: [
      { name: "Administrador" },
      { name: "Usuario" },
    ],
    skipDuplicates: true,
  });
  console.log("Roles iniciales insertados correctamente.");

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
          connect: { name: "Usuario" },
        },
        administrador: {
          connect: { id: adminUser.id },
        },
      },
    });
    console.log("Usuario normal creado correctamente.");
  } else {
    console.log("El usuario normal ya existe.");
  }


  const projectName = "Proyecto de Prueba";
  let project = await prisma.project.findFirst({
    where: { name: projectName },
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: projectName,
        description: "Este es un proyecto de prueba.",
        admin: {
          connect: { id: adminUser.id },
        },
      },
    });
    console.log("Proyecto creado correctamente.");
  } else {
    console.log("El proyecto ya existe.");
  }

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
