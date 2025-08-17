import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateServicioDto {
  @IsString()
  nombre: string;
  @IsString()
  descripcion: string;
  @IsNumber()
  precio: number;
  @IsNumber()
  duracion: number;
}
