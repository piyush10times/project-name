import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import * as fs from 'fs';
  
  @Injectable()
  export class CorsGuard implements CanActivate {
    constructor() {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.switchToHttp();
      const response: Response = ctx.getResponse<Response>();
      const request: Request = ctx.getRequest<Request>();
      const allowedOrigins: string[] = ["http://localhost:5500","http://127.0.0.1:5500"];
      const url = request.originalUrl;
      const origin: string | undefined = request.headers.origin as string;
  
      // response.setHeader('Access-Control-Allow-Origin', origin);
  
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
      const dir = './public/guard/';
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
      }
      await fs.promises.appendFile(dir + fileName, JSON.stringify(observeVar));
//   console.log(observeVar);
  
      if (allowedOrigins.includes(origin)) {
        return true;
      } else {
        const publicEndpoint: string[] = ['/public/widget'];
        const publicEndpointRegex = new RegExp(
          publicEndpoint.map((endpoint) => `^${endpoint}`).join('|'),
        );
        const isPublic = publicEndpointRegex.test(url);
  
        if (isPublic) return true;
      }
  
      return false;
    }
  }
  