// src/auth/guards/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles requeridos
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user)
    const userRoles = user.roles ?? [];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    console.log(hasRole)
    if (!hasRole) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
    }

    return true;
  }
}
