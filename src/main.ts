import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsGuard } from './corsgaurd';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new CorsGuard());
  // app.enableCors({
  //   credentials: true,
  //   allowedHeaders: 'Content-Type,Authorization',
  // });
  await app.listen(7878);
}
bootstrap();
