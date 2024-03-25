import logger from 'src/shared/logger';
import { Controller, Get, Query } from '@nestjs/common';
import { success } from 'src/shared/result';
import { FindReq, RoleEnum } from '~/common';
import { UserService } from './user.service';
import { Result } from '~/shared/types';

@Controller('user')
export class UserController {
     constructor(private readonly userService: UserService) {}

     @Get()
     async get(@Query() params: FindReq): Promise<Result> {
          return this.userService.getAll(params);
     }
}
