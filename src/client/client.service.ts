import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto, userId: number) {
    return await this.prisma.cliente.create({
      data: {
        ...data,
        createdBy: userId,
      },
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
    return await this.prisma.cliente.update({
      where: { id },
      data: {
        ...data,
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
