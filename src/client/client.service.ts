import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  // async create(data: CreateClientDto, userId: number) {
  //   const { vehiculos, ...clienteData } = data;
  //   return await this.prisma.cliente.create({
  //     data: {
  //       ...clienteData,
  //       createdBy: userId,
  //       vehiculos:
  //         vehiculos && vehiculos.length > 0
  //           ? {
  //               create: vehiculos.map((vehiculo) => ({
  //                 placa: vehiculo.placa,
  //                 createdBy: userId,
  //                 ...(vehiculo.marca && { marca: vehiculo.marca }),
  //                 ...(vehiculo.modelo && { modelo: vehiculo.modelo }),
  //                 tipo: {
  //                   connect: { id: vehiculo.tipoId },
  //                 },
  //               })),
  //             }
  //           : undefined,
  //     },
  //     include: {
  //       vehiculos: true,
  //     },
  //   });
  // }
  // async create(data: CreateClientDto, userId: number) {
  //   const { vehiculos, ...clienteData } = data;

  //   return await this.prisma.cliente.create({
  //     data: {
  //       ...clienteData,
  //       createdBy: userId,
  //       vehiculos: vehiculos?.length
  //         ? {
  //             create: vehiculos.map((vehiculo) => ({
  //               placa: vehiculo.placa,
  //               createdBy: userId,
  //               marca: vehiculo.marca ?? '',
  //               modelo: vehiculo.modelo ?? '',
  //               tipo: vehiculo.tipoId
  //                 ? {
  //                     connect: { id: vehiculo.tipoId },
  //                   }
  //                 : undefined,
  //             })),
  //           }
  //         : undefined,
  //     },
  //     include: {
  //       vehiculos: true,
  //     },
  //   });
  // }
  async create(data: CreateClientDto, userId: number) {
    const { vehiculos, ...clienteData } = data;

    return await this.prisma.cliente.create({
      data: {
        ...clienteData,
        createdBy: userId,
        vehiculos: vehiculos?.length
          ? {
              create: vehiculos.map((vehiculo) => ({
                placa: vehiculo.placa,
                createdBy: userId,
                ...(vehiculo.marca ? { marca: vehiculo.marca } : {}),
                ...(vehiculo.modelo ? { modelo: vehiculo.modelo } : {}),
                tipo: { connect: { id: vehiculo.tipoId } },
              })),
            }
          : undefined,
      },
      include: { vehiculos: true },
    });
  }
  async findAll() {
    return await this.prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateClientDto, userId: number) {
    const { vehiculos, ...restoData } = data;
    return await this.prisma.cliente.update({
      where: { id },
      data: {
        ...restoData,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number, userId: number) {
    try {
      return await this.prisma.cliente.update({
        where: { id },
        data: { isActive: false, updatedBy: userId },
      });
    } catch (error) {
      throw new Error(`Error removing client with ID ${id}: ${error.message}`);
    }
  }
}
