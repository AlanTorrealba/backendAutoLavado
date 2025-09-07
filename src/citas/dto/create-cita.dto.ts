import { IsInt, IsArray, IsDateString, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  vehiculoId: number;

  @IsInt()
  tarifaId: number;

  @IsDateString()
  fecha: string;

  @IsInt()
  estatusId: number;

  @IsArray()
  detalles: { 
    servicioId: number; 
    precio: number; 
  }[];
}
