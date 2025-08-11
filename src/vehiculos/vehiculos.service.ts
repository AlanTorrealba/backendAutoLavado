import { Injectable } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class VehiculosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateVehiculoDto, userId: number) {
    return await this.prisma.vehiculo.create({
      data: {
        ...data,
        createdBy: userId,
        isActive: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.vehiculo.findMany({
      where: { isActive: true },
      include: {
        cliente: true,
        tipo: true,
      },
    });
  }

 async findOne(id: number) {
    return await this.prisma.vehiculo.findUnique({
      where: { id },
      include: {
        cliente: true,
        tipo: true,
      },
    });
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto, userId: number) {
    await this.findOne(id)
    return await this.prisma.vehiculo.update({
      where: { id },
      data: { ...updateVehiculoDto, updatedBy: userId },
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id)
    return await this.prisma.vehiculo.update({
      where: { id },
      data: { isActive: false, updatedBy: userId },
    });
  }
}
