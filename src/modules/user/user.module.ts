import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
     imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
     controllers: [UserController],
     providers: [UserService],
})
export class UserModule {}
