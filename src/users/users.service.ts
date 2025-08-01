import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          password: await hash(createUserDto.password, 10),
          email: createUserDto.email,
          nombre: createUserDto.nombre,
          roles: createUserDto.roleIds
            ? { connect: createUserDto.roleIds.map((id) => ({ id })) }
            : undefined,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El nombre de usuario o email ya está en uso');
      }
      throw new BadRequestException('Error al crear el usuario: ' + error.message);
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roles: {
          select: {
            nombre: true,
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
