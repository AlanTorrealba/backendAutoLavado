import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import{ UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        console.log("paso por aqui" + user.username + " " + user.password)
        if (!user) {
            console.log("usuario erroneo")
            throw new UnauthorizedException();
        }
        
        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
            console.log("Contraseña incorrecta");
            throw new UnauthorizedException();

        }
        return user;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
