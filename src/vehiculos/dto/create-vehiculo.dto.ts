import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateVehiculoDto {
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

  @IsNumber()
  clienteId: number;
}
