import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';  
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.use((req, res, next) => {
  //   console.log('Petición recibida:', req.method, req.url , req.body);
  //   next();
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
