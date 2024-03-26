import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody } from './dto/user.body';
import { FindReq } from '../../common';
import { Result } from '../../shared/types';

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
