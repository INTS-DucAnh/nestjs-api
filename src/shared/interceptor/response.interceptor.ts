import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Result, ResultError, ResultSuccess, TResponse } from '../types';
import { Request } from 'express';
import { HttpStatus } from '../../common';
import { mask } from '../mask/mask';
import { loggerResponse } from '../logger/logger.response';

@Injectable()
export class HandleResponse implements NestInterceptor {
     intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
          return next.handle().pipe(
               map((data: Result): TResponse => {
                    const request: Request = context.switchToHttp().getRequest();
                    let responseData: any;
                    const status: HttpStatus = data.status ?? HttpStatus.BAD_REQUEST;

                    if (status > 300) {
                         const resultError = data as ResultError;
                         responseData = {
                              status: status,
                              code: resultError.code,
                              message: resultError.message,
                              result: [],
                         };
                    } else {
                         const resultSuccess = data as ResultSuccess;
                         responseData = {
                              status: resultSuccess.status,
                              code: resultSuccess.code || '',
                              message: resultSuccess.message || '',
                              result: { ...resultSuccess.data },
                         };
                    }

                    const maskedRespone = { responseData };
                    mask(maskedRespone, ['password', 'access_token', 'refresh_token']);
                    const requestBody = JSON.parse(JSON.stringify(request.body));
                    mask(requestBody, ['password', 'access_token', 'refresh_token']);

                    const correlationId = request.correlation_id;
                    const request_id = request.request_id;
                    loggerResponse({
                         tags: 'response',
                         requestId: request_id,
                         status: status,
                         body: requestBody,
                         responseData: maskedRespone,
                         correlationId: correlationId,
                    });

                    return responseData;
               }),
          );
     }
}
