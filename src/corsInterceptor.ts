import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Request, Response } from 'express';
//   import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class CorsInterceptor implements NestInterceptor {
    constructor() {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const response: Response = ctx.getResponse<Response>();
      const request: Request = ctx.getRequest<Request>();
      const allowedOrigins: string[] = ["http://localhost:5500"];
      const origin: string | undefined = request.headers.origin;
  
      if (!origin) {
        return next.handle();
      }
  
      console.log('allowedOrigins', allowedOrigins, origin);
  
      if (allowedOrigins.includes(origin)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
      } else {
        const publicEndpoint: string[] = ['/public/widget'];
        const url = request.originalUrl;
        const publicEndpointRegex = new RegExp(
          publicEndpoint.map((endpoint) => `^${endpoint}`).join('|'),
        );
        const isPublic = publicEndpointRegex.test(url);
  
        if (isPublic) {
          response.setHeader('Access-Control-Allow-Origin', origin);
        } else {
          response.status(HttpStatus.BAD_REQUEST).json({
            error: new HttpException('Not allowed', HttpStatus.BAD_REQUEST),
          });
          return next.handle();
        }
      }
  
      response.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,DELETE,OPTIONS',
      );
      response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
  
      if (request.method === 'OPTIONS') {
        response.status(204).send();
        return next.handle();
      } else {
        return next.handle();
      }
    }
  }
  