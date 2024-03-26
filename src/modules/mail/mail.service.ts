import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { success } from '../../shared/result';
import { SendMailCretaeUser } from './dto/mail.body';
import { configs } from '../../configs';
import { HttpError } from '../../shared/result/http.exception';
import { HttpStatus } from '../../common';

@Injectable()
export class MailService {
     constructor(private readonly mailService: MailerService) {}

     async sendMailCreateUser(params: SendMailCretaeUser) {
          try {
               await this.mailService.sendMail({
                    to: params.mailUser,
                    from: configs.mail.user,
                    subject: 'Create account',
                    template: configs.mail.tplCreateUser,
                    context: {
                         user: params,
                    },
               });
               return success.ok('', 'send mail successfully');
          } catch (error) {
               throw new HttpError({
                    message: 'Exception send mail create user',
                    status: HttpStatus.BAD_REQUEST,
                    code: 'ERROR_SEND_MAIL',
               });
          }
     }
}
