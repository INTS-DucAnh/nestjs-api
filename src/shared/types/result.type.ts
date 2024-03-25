import { HttpStatus } from 'src/common';
import { Message } from './message.type';

export interface ResultSuccess {
     status: HttpStatus;
     message?: Message;
     code?: string;
     data: any;
}

export interface ResultError {
     status: HttpStatus;
     code?: string;
     message?: Message;
     errors?: ErrorDetail[];
}

export interface ErrorDetail {
     location?: string;
     method?: string;
     url?: string;
     value?: any;
     param?: string;
     message?: Message;
}

export type Result = ResultSuccess | ResultError;
