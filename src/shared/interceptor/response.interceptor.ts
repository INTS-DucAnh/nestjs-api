import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Result, ResultError, ResultSuccess } from '../types';
import { TResponse } from '../types/response.type';
import { HttpStatus } from 'src/common';

@Injectable()
export class HandleResponse implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: Result): TResponse => {
                let responseData: any;
                const status: HttpStatus =
                    data.status ?? HttpStatus.BAD_REQUEST;
                if (status > 200) {
                    const code: string = data.code ?? '';
                    let resultError = data as ResultError;
                    responseData = {
                        status: status,
                        code: code,
                        message: resultError.message,
                        errors: resultError.errors,
                    };
                }

                let resultSuccess = data as ResultSuccess;
                responseData = resultSuccess.data ?? resultSuccess;
                responseData = {
                    status: resultSuccess.status,
                    code: resultSuccess.code,
                    result: { ...resultSuccess.data },
                };
                return responseData;
            }),
        );
    }
}
