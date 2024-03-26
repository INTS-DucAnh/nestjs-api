import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { success } from '../../shared/result';

@Injectable()
export class MailService {
     constructor(private readonly mailService: MailerService) {}

     async sendMail() {
          this.mailService.sendMail({
               to: 'honngduong25@gmail.com',
               from: 'hduonng2502@gmail.com',
               subject: 'Test send mail',
               template: 'mail',
               context: {
               },
          });

          return success.ok('', 'send mail successfully');
     }
}
