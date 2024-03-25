import { Controller, Get } from '@nestjs/common';
import { RoleEnum } from '~/common';

@Controller('auth')
export class AuthController {
     constructor() {}

     @Get('role')
     async getRole() {
          return RoleEnum;
     }
}
