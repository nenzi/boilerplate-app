import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Define the format of the log message as per your requirements
    const logFormat = ':method :url :status :response-time ms';

    // Use Morgan to log requests
    morgan(logFormat)(req, res, next);
  }
}
