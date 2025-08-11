import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';


class VehiculoDto {
 
  @IsString()
  placa: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsNumber()
  tipoId: number;
}

export class CreateClientDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;
  @IsString()
  cedula: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehiculoDto)
  vehiculos?: VehiculoDto[];
}
