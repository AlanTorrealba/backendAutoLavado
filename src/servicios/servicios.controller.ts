import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import {
  JwtAuthGuard,
  RolesGuard,
  Permissions,
  PermissionsGuard,
} from 'src/auth';
import { User } from 'src/common/decorators/user.decorator';
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Permissions('GESTIONAR_USUARIOS')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(@Body() createServicioDto: CreateServicioDto, @User() user: any) {
    return this.serviciosService.create(createServicioDto, user.userId);
  }

  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
    @User() user: any,
  ) {
    return this.serviciosService.update(+id, updateServicioDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.serviciosService.remove(+id, user.userId);
  }
}
