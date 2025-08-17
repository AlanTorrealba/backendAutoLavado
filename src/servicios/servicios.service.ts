import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ServiciosService {
  constructor (private prisma: PrismaService) {}

  async create(createServicioDto: CreateServicioDto, userId: number) {
    return await this.prisma.servicio.create({
      data:{...createServicioDto,
        createdBy: userId,
        isActive: true
      },
    });
  }

  findAll() {
    return this.prisma.servicio.findMany();
  }

  findOne(id: number) {
    return this.prisma.servicio.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateServicioDto: UpdateServicioDto, userId: number) {
    return await this.prisma.servicio.update({
      where: { id },
      data: {
        ...updateServicioDto,
        updatedBy: userId,
      },
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.servicio.update({
      where: { id },
      data: {
        isActive: false,
        updatedBy: userId
      },
    });
  }
}
