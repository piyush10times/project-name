// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { FastifyReply, FastifyRequest } from 'fastify';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class CorsInterceptor implements NestInterceptor {
//   constructor(private readonly config: ConfigService) {}
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const ctx = context.switchToHttp();
//     const response: FastifyReply = ctx.getResponse();
//     const request: FastifyRequest = ctx.getRequest();
//     const allowedOrigins: string[] = JSON.parse(
//       this.config.get('ORIGIN') ?? '[]',
//     );
//     const origin: string | undefined = request.headers.origin;
//     if (!origin) {
//       return next.handle();
//     }
//     console.log('allowedOrigins', allowedOrigins, origin);

//     if (allowedOrigins.includes(origin)) {
//       response.header('Access-Control-Allow-Origin', origin);
//     } else {
//       const publicEndpoint: string[] = ['/public/widget'];
//       const url = ctx.getRequest().originalUrl;
//       const publicEndpointRegex = new RegExp(
//         publicEndpoint.map((endpoint) => `^${endpoint}`).join('|'),
//       );
//       const isPublic = publicEndpointRegex.test(url);
//       if (isPublic) response.header('Access-Control-Allow-Origin', origin);
//       else {
//         response.send({
//           error: new HttpException('not allowed', HttpStatus.BAD_REQUEST),
//         });
//         return next.handle();
//       }
//     }
//     response.header(
//       'Access-Control-Allow-Methods',
//       'GET,POST,PUT,DELETE,OPTIONS',
//     );
//     response.header(
//       'Access-Control-Allow-Headers',
//       'Content-Type, Authorization',
//     );
//     if (request.method === 'OPTIONS') {
//       response.status(204).send();
//       return next.handle();
//     } else {
//       return next.handle();
//     }
//   }
// }
