import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
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
    if (username === "Alan") {
      // Hash de '1234' generado con bcrypt
      return { id: 1, username: "Alan", password: "$2a$12$sjSaItDtFS/rbsHxwpwv.erfRkyea6REcjLcSasQFpXHMyeyJ0xPW" };
    }
    return null;
  }
}
