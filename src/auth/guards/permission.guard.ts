// src/auth/guards/permissions.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndMerge<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user
    console.log('Usuario autenticado: desde Permissions Guard', user);
    const userPermissions: string [] = user.permissions ?? [];

      const hasPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));
    console.log(hasPermission, 'Desde Permissions Guard')
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
      }
  
      return true;
  }

}
