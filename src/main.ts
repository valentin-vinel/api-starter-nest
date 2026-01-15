import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
