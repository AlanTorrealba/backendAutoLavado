import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  roleIds?: number[];
}
