import { HttpException } from '@nestjs/common';
import { ResultError } from '../types';

export class HttpError extends HttpException {
     constructor(public err: ResultError) {
          super({ message: err.message, code: err.code, status: err.status }, err.status);
     }
}
