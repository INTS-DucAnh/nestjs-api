import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { HttpStatus } from 'src/common';
import { Result, ResultError, ResultSuccess, TResponse } from '../types';
import logger from '../logger';

@Injectable()
export class HandleResponse implements NestInterceptor {
     intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
          return next.handle().pipe(
               map((data: Result): TResponse => {
                    const request = context.switchToHttp().getRequest();
                    let responseData: any;
                    const status: HttpStatus = data.status ?? HttpStatus.BAD_REQUEST;

                    if (status > 200) {
                         const resultError = data as ResultError;
                         responseData = {
                              status: status,
                              code: resultError.code ?? '',
                              message: resultError.message,
                              errors: resultError.errors,
                         };
                    } else {
                         const resultSuccess = data as ResultSuccess;
                         responseData = {
                              status: resultSuccess.status,
                              code: resultSuccess.code,
                              result: { ...resultSuccess.data },
                         };
                    }

                    const correlationId = request.correlation_id;
                    const request_id = request.request_id;
                    logResponse(request_id, status, request.body, correlationId, responseData);

                    return responseData;
               }),
          );
     }
}

const logResponse = (
     request_id: string,
     status_code: HttpStatus,
     body: any,
     correlation_id?: string,
     response_data?: any,
): void => {
     const response_time = new Date();
     const data = {
          request_id,
          correlation_id,
          response_time,
          status_code,
          response_data,
          body,
     };

     logger.info(JSON.stringify(data), {
          tags: ['response'],
     });
};
