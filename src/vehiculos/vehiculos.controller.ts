import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { JwtAuthGuard, RolesGuard, Permissions, PermissionsGuard } from 'src/auth';
import { User } from 'src/common/decorators/user.decorator';
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Permissions('GESTIONAR_USUARIOS')
@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  create(@Body() createVehiculoDto: CreateVehiculoDto, @User() user: any) {
    return this.vehiculosService.create(createVehiculoDto, user.userId);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehiculoDto: UpdateVehiculoDto, @User() user:any) {
    return this.vehiculosService.update(+id, updateVehiculoDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.vehiculosService.remove(+id, user.userId);
  }
}
