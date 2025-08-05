import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('User decorator called');
    console.log('Request user:', request.user);
    return request.user; // <- aquí es donde está el JWT decodificado
  },
);