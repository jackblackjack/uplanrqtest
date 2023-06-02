import * as util from 'util';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  HttpException,
  PayloadTooLargeException,
} from '@nestjs/common/exceptions';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class ApiExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(
    exception: HttpException | PayloadTooLargeException | Error | unknown,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const meta = {
      timestamp: Date.now(),
      path: request.url,
    };

    let status: string, detail: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus().toString();
      const response = exception.getResponse() as Error;
      const { message } = response;

      if (Array.isArray(message)) {
        detail = message.join('; ');
      } else if (typeof message === 'object') {
        detail = JSON.stringify(message);
      } else if (typeof message === 'string') {
        detail = message;
      }
    } else if (exception instanceof EntityNotFoundError) {
      status = `${HttpStatus.NOT_FOUND}`;
      detail = exception.message;
    } else if (exception instanceof QueryFailedError) {
      status = `${HttpStatus.UNPROCESSABLE_ENTITY}`;
      detail = exception.message;
    } else {
      status = `${HttpStatus.INTERNAL_SERVER_ERROR}`;
      detail = 'Internal server error';
    }

    this.logger.error(
      request.url,
      `${util.inspect(exception, false, null, false)}`,
    );
    response.status(+status).json({ status, detail, meta });
  }
}
