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
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { User } from 'src/common/decorators/user.decorator';
import {
  JwtAuthGuard,
  RolesGuard,
  Permissions,
  PermissionsGuard,
} from 'src/auth';
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Permissions('GESTIONAR_USUARIOS')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto, @User() user:any) {
    return this.citasService.create(createCitaDto, user.userId);
  }

  @Get()
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto, @User() user:any) {
    return this.citasService.update(+id, updateCitaDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
