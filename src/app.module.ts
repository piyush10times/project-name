import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { PublicModule } from './public/public.module';
import { RequestLoggingMiddleware } from './midle';

@Module({
  imports: [DashboardModule, PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
