import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse() as
      | string
      | { message: string; error: string; statusCode: number };

    if (typeof message === 'string') {
      response.status(status).json({
        succes: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    } else {
      response.status(status).json({
        succes: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...message,
      });
    }
  }
}
