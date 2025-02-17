import { Result } from './result.type';
import { Message } from './message.type';
import { HttpStatus } from '../../common';

export type TResponse = {
     status: HttpStatus;
     result: Result;
     code?: string;
     message?: Message;
};
