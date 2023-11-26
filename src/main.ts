import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtMiddleware } from './middleware/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  // app.use(JwtMiddleware);
  await app.listen(3001);
}
bootstrap();
