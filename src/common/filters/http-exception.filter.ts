import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const error = typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as object);

    response.status(exception.getStatus()).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
