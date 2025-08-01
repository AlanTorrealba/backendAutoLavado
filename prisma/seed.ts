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
      descripcion: 'Administrador del sistema',
      permisos: {
        create: [
          { permission: { connect: { id: permisoGestionUsuarios.id } } },
          { permission: { connect: { id: permisoGestionCitas.id } } },
        ],
      },
    },
  });

  const rolOperador = await prisma.role.create({
    data: {
      nombre: 'operador',
      descripcion: 'Personal operativo',
      permisos: {
        create: [{ permission: { connect: { id: permisoGestionCitas.id } } }],
      },
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
        create: [{ roleId: rolAdmin.id }],
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
      clienteId: cliente.id,
      vehiculoId: vehiculo.id,
      tarifaId: tarifa.id,
      fecha: new Date(),
      estatus: 'Pendiente',
      citaServicios: {
        create: [{ servicioId: servicio.id }],
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
