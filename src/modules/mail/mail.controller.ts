import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
     constructor(private readonly mailService: MailService) {}

     @Post()
     async sendMail() {
          return this.mailService.sendMail();
     }
}
