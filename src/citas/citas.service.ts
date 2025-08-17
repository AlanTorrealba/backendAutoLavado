import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment';
import { Servicio } from 'src/servicios/entities/servicio.entity';
@Injectable()
export class CitasService {
  constructor(private prisma: PrismaService) {}

  async create(createCitaDto: CreateCitaDto, userId: number) {
    const { fecha, detalles, ...citaData } = createCitaDto;
    const fechaFormateada = moment(fecha).format('YYYYMMDD');

    return await this.prisma.cita.create({
      data: {
        ...citaData,
        createdBy: userId,
        updatedBy: userId,
        fecha: new Date(moment(fechaFormateada, 'YYYYMMDD').toDate()),
        citaServicios:
          detalles && detalles.length
            ? {
                create: detalles.map((detalle) => ({
                  servicioId: detalle.servicioId,
                  precio: detalle.precio,
                })),
              }
            : undefined,
      },
      include: {
        citaServicios: { include: { servicio: true } },
        cliente: true,
        vehiculo: true,
        tarifa: true,
      },
    });
  }

  async findAll() {
    const citas = await this.prisma.cita.findMany({
      where: { isActive: true },
      include: {
        citaServicios: { include: { servicio: true } },
        cliente: true,
        vehiculo: true,
        tarifa: true,
      },
    });

    return citas.map((cita) => ({
      ...cita,
      total: cita.citaServicios.reduce(
        (sum, cs) => sum + cs.precio * (cs.cantidad ?? 1),
        0,
      ),
    }));
  }

  findOne(id: number) {
    return this.prisma.cita.findUnique({
      where: { id },
      include: {
        citaServicios: { include: { servicio: true } },
        cliente: true,
        vehiculo: true,
        tarifa: true,
      },
    });
  }

  async update(id: number, data: UpdateCitaDto, userId: number) {
    const { detalles, ...citaData } = data;

    return this.prisma.cita.update({
      where: { id },
      data: {
        ...citaData,
        updatedBy: userId,
        fecha: moment(citaData.fecha, 'YYYYMMDD').toDate(),
        citaServicios:
          detalles && detalles.length
            ? {
                deleteMany: {},
                create: detalles.map((detalle) => ({
                  servicioId: detalle.servicioId,
                  precio: detalle.precio,
                })),
              }
            : undefined,
      },
      include: {
        citaServicios: { include: { servicio: true } },
        cliente: true,
        vehiculo: true,
        tarifa: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.cita.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
