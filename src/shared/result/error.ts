import { ErrorCodeEnum, HttpStatus } from '../../common';
import { Message, ResultError } from '../types';

export const exists = (value: Message): ResultError => {
     return {
          status: HttpStatus.BAD_REQUEST,
          code: ErrorCodeEnum.ALREADY_EXISTS,
          message: `${value} already exists`,
     };
};

export const urlNotFound = (path: Message): ResultError => {
     return {
          status: HttpStatus.NOT_FOUND,
          code: ErrorCodeEnum.URL_NOT_FOUND,
          message: `the url ${path} was not found`,
     };
};

export const exception = (err: Error): ResultError => {
     return {
          status: HttpStatus.INTERNAL_SERVER,
          code: ErrorCodeEnum.EXCEPTION,
          message: err.message,
     };
};

export const generic = (params: { message: Message; status: HttpStatus }): ResultError => {
     return {
          status: params.status,
          message: params.message,
     };
};

export const invalidData = (params: {
     location?: string;
     param?: string;
     value?: any;
     message?: Message;
}): ResultError => {
     const _location = params.location || 'body';
     return {
          status: HttpStatus.BAD_REQUEST,
          code: ErrorCodeEnum.INVALID_DATA,
          errors: [
               {
                    location: _location,
                    param: params.param,
                    value: params.value,
                    message: params.message,
               },
          ],
     };
};
