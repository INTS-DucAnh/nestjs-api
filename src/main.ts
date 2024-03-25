import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configs } from './configs';
import logger from 'src/shared/logger';

async function bootstrap() {
     const app = await NestFactory.create<NestExpressApplication>(AppModule, {
          logger: ['debug', 'error', 'fatal', 'verbose', 'warn'],
          cors: true,
     });

     const host = configs.app.host;
     const port = configs.app.port;
     const prefix: string = configs.app.prefix;

     logger.config({ configs: configs.log });

     app.setGlobalPrefix(prefix);

     await app.listen(port, host, () => {
          logger.info(`Listening on: ${host}:${port}`);
     });
}
bootstrap();
