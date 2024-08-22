import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLoggingMiddleware');

  use(req: Request, res: Response, next) {
    const { method, url, body, headers } = req;
    this.logger.log({
      method,
      url,
      body,
      headers,
    });
    next();
  }
}