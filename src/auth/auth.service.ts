import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      console.log("usuario erroneo")
      throw new UnauthorizedException();
    }
// console.log(user)
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      console.log("contraseña incorrecto")
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    console.log(user)
    const payload = { username: user.username, sub: user.id, roles: user.roles.map((role: any) => role.nombre), permissions: user.roles.flatMap(role =>
  role.permisos.map(p => p.permission.nombre)
) };
   console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
