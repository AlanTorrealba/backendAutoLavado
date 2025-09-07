import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear permisos
  const permisoGestionUsuarios = await prisma.permission.create({
    data: {
      nombre: 'GESTIONAR_USUARIOS',
      descripcion: 'Permite gestionar usuarios y roles',
    },
  });

  const permisoGestionCitas = await prisma.permission.create({
    data: {
      nombre: 'GESTIONAR_CITAS',
      descripcion: 'Permite gestionar las citas',
    },
  });

  // Crear roles
  const rolAdmin = await prisma.role.create({
    data: {
      nombre: 'admin',
      descripcion: 'Administrador',
    },
  });

  const rolOperador = await prisma.role.create({
    data: {
      nombre: 'operador',
      descripcion: 'Personal operativo',
    },
  });

  // Crear usuario admin
  const usuarioAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin123', // ⚠️ En producción, usar hash (ej: bcrypt)
      nombre: 'Administrador',
      email: 'admin@autolavado.com',
      roles: {
        connect: [{ id: rolAdmin.id }, { id: rolOperador.id }],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: 'usuario',
      password: 'usuario123',
      nombre: 'Usuario',
      email: 'usuario@demo.com',
      roles: {
        connect: [{ id: rolOperador.id }],
      },
    },
  });

  // Tipo de vehículo
  const tipoVehiculo = await prisma.tipoVehiculo.create({
    data: {
      nombre: 'Sedán',
    },
  });

  // Cliente
  const cliente = await prisma.cliente.create({
    data: {
      nombre: 'Carlos Pérez',
      cedula: 'V12345678',
      telefono: '04141234567',
    },
  });
  const estatus = await prisma.estatus.createMany({
  data: [
    { nombre: "Pendiente" },
    { nombre: "Confirmada" },
    { nombre: "En Proceso" },
    { nombre: "Completada" },
    { nombre: "Cancelada" },
  ],
});


  // Vehículo
  const vehiculo = await prisma.vehiculo.create({
    data: {
      placa: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla',
      tipoId: tipoVehiculo.id,
      clienteId: cliente.id,
    },
  });

  // Servicio
  const servicio = await prisma.servicio.create({
    data: {
      nombre: 'Lavado completo',
      descripcion: 'Lavado exterior e interior del vehículo',
    },
  });

  // Tarifa
  const tarifa = await prisma.tarifa.create({
    data: {
      nombre: 'Tarifa estándar',
      precio: 15.0,
    },
  });

  // Cita
  const cita = await prisma.cita.create({
    data: {
      fecha: new Date(),
      clienteId: cliente.id,
      vehiculoId: vehiculo.id,
      tarifaId: 1, // <-- el ID de una tarifa existente
      estatusId: 1, // <-- o el valor que definas
      createdBy: 1,
      updatedBy: 1,
      citaServicios: {
        create: {
          servicioId: servicio.id,
          precio: servicio.precio,
        },
      },
    },
  });

  console.log('Seed ejecutado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
