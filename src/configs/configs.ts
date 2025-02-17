import 'dotenv/config';
import * as process from 'process';

export const configs = {
     app: {
          prefix: process.env.PREFIX || '/api/v1',
          host: process.env.HOST || '0.0.0.0',
          port: process.env.PORT,
     },

     log: {
          logFileEnabled: process.env.LAB_LOG_FILE_ENABLED || 'true',
          folderLogsPath: process.env.LAB_FOLDER_LOGS_PATH || `${__dirname}/../../logs`,

          logstashEnabled: process.env.LAB_LOG_LOGSTASH_ENABLED || 'false',
          logstashHost: process.env.LAB_LOG_LOGSTASH_HOST || '127.0.0.1',
          logstashPort: process.env.LAB_LOG_LOGSTASH_PORT || '50001',
          logstashProtocol: process.env.LAB_LOG_LOGSTASH_PROTOCOL || 'udp',
     },

     keys: {
          private_key: process.env.PRIVATE_KEY || '',
          public_key: process.env.PUBLIC_KEY || '',
     },

     jwt: {
          expiresIn: process.env.EXPIRES_IN,
          algorithm: process.env.ALGORITHM || 'RS256',
          expire_at: process.env.EXPIRE_AT || '3600',
          expire_refresh_token_at: process.env.EXPIRE_REFRESH_TOKEN_AT,
     },

     login: {
          number_of_tired: process.env.NUMBER_OF_TIRED,
     },

     main: {
          body_parser_json_limit: process.env.BODY_PARSER_JSON_LIMIT,
          validation_pipe_tranfrom: process.env.VALIDATION_PIPE_TRANSFORM,
     },

     auth: {
          lock_time: process.env.LOCK_TIME,
     },

     exclude: {
          auth: {
               login: process.env.AUTH_LOGIN_EXCLUDE,
               refresh_token: process.env.AUTH_REFRESH_EXCLUDE,
          },
          user: {
               create: process.env.USER_CREATE_EXCLUDE,
               update: process.env.USER_CREATE_EXCLUDE,
          },
     },

     file: {
          limit: process.env.LIMIT_FILE,
          mess: process.env.MESS,
     },

     random: {
          character: process.env.CHARACTER,
          length: process.env.LENGTH,
     },

     default: {
          page: process.env.PAGE_DEFAULT,
          size: process.env.SIZE_DEFAULT,
     },

     mail: {
          host: process.env.MAIL_HOST,
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
          path: process.env.MAIL_PATH,
          tplCreateUser: process.env.TEMPLATES_CREATE_USER
     },
};
