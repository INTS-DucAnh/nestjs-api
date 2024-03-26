import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

export const MailConfig: MailerAsyncOptions = {
     useFactory: async () => ({
          transport: {
               host: process.env.MAIL_HOST,
               secure: true,
               auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
               },
          },
          defaults: {
               from: `"No Reply" ${process.env.MAIL_USER}`,
          },
          template: {
               dir: join('src/modules/mail/templates'),
               adapter: new HandlebarsAdapter(),
               options: {
                    strict: true,
               },
          },
     }),
};
