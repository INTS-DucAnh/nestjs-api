import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';
import { PostCategoryModule } from './modules/post-category/post-category.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HandleResponse } from './shared/interceptor/response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { withCache } from './configs';
import { AuthModule } from './modules/auth/auth.module';
import { RequestInitialization } from './shared/middleware/request.Initialization';
import { MailModule } from './modules/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './configs/mail.config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ExceptionHandle } from './shared/exception/exception.handle';

@Module({
     imports: [
          MailerModule.forRootAsync(MailConfig),
          TypeOrmModule.forRoot(withCache),
          UserModule,
          CategoryModule,
          PostModule,
          PostCategoryModule,
          AuthModule,
          MailModule,
     ],
     controllers: [],
     providers: [
          {
               provide: APP_INTERCEPTOR,
               useClass: HandleResponse,
          },

          {
               provide: APP_FILTER,
               useClass: ExceptionHandle,
          },
     ],
})
export class AppModule implements NestModule {
     configure(consumer: MiddlewareConsumer) {
          consumer.apply(RequestInitialization).forRoutes('*');
     }
}
