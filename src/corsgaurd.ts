import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs';

@Injectable()
export class CorsGaurd implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const response: FastifyReply = ctx.getResponse();
    const request: FastifyRequest = ctx.getRequest();
    const allowedOrigins: string[] = ["http://localhost:5500"];
    const url = request.originalUrl;
    const origin: string | undefined = request.headers.origin;
    response.header('Access-Control-Allow-Origin', origin);
    if (!origin) {
      return true;
    }
    const observeVar = {
      allowedOrigins,
      origin,
      url,
      request: request.headers,
    };
    console.log(observeVar);
    
    const fileName = 'CorsGuard.txt';
    const dir = './public/gaurd/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.promises.appendFile(dir + fileName, JSON.stringify(observeVar));
    if (allowedOrigins.includes(origin)) {
      return true;
    } else {
      const publicEndpoint: string[] = ['/public/widget'];
      const url = request.originalUrl;

      const publicEndpointRegex = new RegExp(
        publicEndpoint.map((endpoint) => `^${endpoint}`).join('|'),
      );
      const isPublic = publicEndpointRegex.test(url);
      if (isPublic) return true;
    }
    // response.header(
    //   'Access-Control-Allow-Methods',
    //   'GET,POST,PUT,DELETE,OPTIONS',
    // );
    // response.header(
    //   'Access-Control-Allow-Headers',
    //   'Content-Type, Authorization',
    // );
    // throw new HttpException('not allowed', HttpStatus.BAD_REQUEST);
    return false;
  }
}
  