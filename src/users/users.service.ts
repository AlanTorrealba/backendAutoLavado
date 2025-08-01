import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    // return this.prisma.user.create();
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roles: {
          select: {
            role:{
              select: {
                nombre: true,
              },
            },
          },
        },
      },
      orderBy: {
        username: 'asc',
      },
    });
    // return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByUsername(username: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { username: username },
      include: { roles: true }, // Cambia 'rol' si tu modelo lo tiene como 'roles'
    });
  }
}
