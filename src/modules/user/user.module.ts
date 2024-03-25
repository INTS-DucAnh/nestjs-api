import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import logger from '@NestJS/logger';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
