import logger from '@NestJS/logger';
import { Controller, Get } from '@nestjs/common';
import { success } from 'src/shared/result';

@Controller('user')
export class UserController {
    constructor() {}

    private user = {
        page: '1',
        size: '10',
        totalPage: '1',
        data: [
            {
                name: 'hduong',
                age: 23,
                email: 'hduong25@gmail.com',
                adress: 'bg',
            },
        ],
    };

    @Get()
    async get() {
        logger.info('aa');
        return success.ok(this.user);
    }
}
