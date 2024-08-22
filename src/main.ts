import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsInterceptor } from './corsInterceptor';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { CorsGaurd } from './corsgaurd';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalGuards(new CorsGaurd());
  // app.useGlobalInterceptors(new CorsInterceptor());
  // console.log("gfrueri");
  app.enableCors({
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(10000);
}
bootstrap();
