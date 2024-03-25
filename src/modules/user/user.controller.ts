import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FindReq } from '~/common';
import { UserService } from './user.service';
import { Result } from '~/shared/types';
import { CreateUserBody } from './dto/user.body';

@Controller('user')
export class UserController {
     constructor(private readonly userService: UserService) {}

     @Get()
     async getAll(@Query() params: FindReq): Promise<Result> {
          return this.userService.getAll(params);
     }

     @Post()
     async create(@Body() body: CreateUserBody): Promise<Result> {
          return this.userService.create(body);
     }
}
