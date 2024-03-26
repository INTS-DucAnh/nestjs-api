import { HttpStatus } from '../../common';
import { ResultSuccess } from '../types';

export const ok = (data: any, message?: string): ResultSuccess => {
     return {
          status: HttpStatus.OK,
          message: message ?? '',
          data: data,
     };
};

export const created = (data: any, message?: string): ResultSuccess => {
     return {
          status: HttpStatus.CREATED,
          message: message ?? '',
          data: data,
     };
};

export const noContent = (message?: string): ResultSuccess => {
     return {
          status: HttpStatus.NO_CONTENT,
          message: message ?? '',
          data: undefined,
     };
};
