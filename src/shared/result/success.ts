import { HttpStatus } from 'src/common';
import { ResultSuccess } from '../types';

export const ok = (data: any): ResultSuccess => {
    return {
        status: HttpStatus.OK,
        data: data,
    };
};

export const created = (data: any): ResultSuccess => {
    return {
        status: HttpStatus.CREATED,
        data: data,
    };
};

export const noContent = (): ResultSuccess => {
    return {
        status: HttpStatus.NO_CONTENT,
        data: undefined,
    };
};
