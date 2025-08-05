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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { PermissionsGuard } from 'src/auth/guards/permission.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Controller('client')
@Permissions('GESTIONAR_USUARIOS')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Post()
  create(@Body() createClientDto: CreateClientDto, @User() user: any) {
    return this.clientService.create(createClientDto, user.userId);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @User() user: any) {
    return this.clientService.update(+id, updateClientDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.clientService.remove(+id, user.userId);
  }
}
