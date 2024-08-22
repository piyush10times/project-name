import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsGuard } from './corsgaurd';
import { CorsInterceptor } from './corsInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let guard=await app.useGlobalGuards(new CorsGuard());
  // await app.useGlobalInterceptors(new CorsInterceptor());
  console.log("gfrueri",guard);
  app.enableCors({
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(7878);
}
bootstrap();
