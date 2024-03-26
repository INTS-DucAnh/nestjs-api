import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpError } from '../result/http.exception';
import { mask } from '../mask/mask';
import { Request, Response } from 'express';
import { loggerResponse } from '../logger/logger.response';

@Catch(HttpError)
export class ExceptionHandle implements ExceptionFilter {
     catch(exception: HttpError, host: ArgumentsHost): void {
          const { err } = exception;
          const request: Request = host.switchToHttp().getRequest();
          const response: Response = host.switchToHttp().getResponse();

          const responseData = {
               status: err.status,
               code: err.code,
               message: err.message,
               result: [],
          };

          const maskedResponse = { responseData };
          mask(maskedResponse, ['password', 'accessToken', 'refreshToken']);

          const requestBody = request.body
               ? mask(JSON.parse(JSON.stringify(request.body)), ['password', 'accessToken', 'refreshToken'])
               : {};

          const correlationId = request.correlation_id;
          const requestId = request.request_id;

          loggerResponse({
               tags: 'exception',
               requestId: requestId,
               status: err.status,
               body: requestBody,
               responseData: maskedResponse,
               correlationId: correlationId,
          });
          response.send(responseData);
     }
}
