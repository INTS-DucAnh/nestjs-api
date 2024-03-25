import { HttpStatus } from 'src/common';
import { Result } from './result.type';
import { Message } from './message.type';

export type TResponse = {
    status: HttpStatus;
    result: Result;
    code?: string;
    message?: Message;
};
