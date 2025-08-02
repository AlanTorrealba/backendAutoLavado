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
      throw new BadRequestException('Error al crear el usuario: ' + error.meta?.cause);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id:id,
        },
        data:{
          username: updateUserDto.username,
          email: updateUserDto.email,
          nombre: updateUserDto.nombre,
          roles: updateUserDto.roleIds
            ? { set: updateUserDto.roleIds.map((id) => ({ id })) }
            : undefined,
        }

      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El nombre de usuario o email ya está en uso');
      }
      throw new BadRequestException('Error al actualizar el usuario: ' + error.meta?.cause);
    } 
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.update({
        where:{ id:id},
          data:{
            isActive: false
          }
        
      })
    } catch (error) {
      if (error.code === 'P2003') {
        throw new ConflictException('El usuario no se puede eliminar porque está asociado a otros registros');
      }
      throw new BadRequestException('Error al eliminar el usuario: ' + error.meta?.cause);
    }
  }
  async findByUsername(username: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { username: username },
      include: { roles: true }, // Cambia 'rol' si tu modelo lo tiene como 'roles'
    });
  }
}
