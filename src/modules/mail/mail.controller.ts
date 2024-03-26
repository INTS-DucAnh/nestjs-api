import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
     constructor(private readonly mailService: MailService) {}

     // @Post()
     // async sendMail() {
     //      let data = {
     //           mailUser: 'honngduong25@gmail.com',
     //           name: 'hduong',
     //           createDate: '2024-03-25 16:59:15.122049',
     //      };
     //      return this.mailService.sendMail(data);
     // }
}
