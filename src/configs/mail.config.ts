import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { configs } from './configs';

export const MailConfig: MailerAsyncOptions = {
     useFactory: async () => ({
          transport: {
               host: configs.mail.host,
               secure: true,
               auth: {
                    user: configs.mail.user,
                    pass: configs.mail.pass,
               },
          },
          defaults: {
               from: `"No Reply" ${configs.mail.user}`,
          },
          template: {
               dir: join(__dirname, `${configs.mail.path}`),
               adapter: new HandlebarsAdapter(),
               options: {
                    strict: true,
               },
          },
     }),
};
