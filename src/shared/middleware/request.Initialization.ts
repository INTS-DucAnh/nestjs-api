import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import * as uuid from 'uuid';

export interface Payload {
     id: string;
     roles: string[];
     name: string;
     type: string;
     email: string;
}
declare module 'express-serve-static-core' {
     export interface Request {
          payload?: Payload;
          request_id: string;
          correlation_id?: string;
          requested_time?: number;
          source_hostname?: string;
          source_netname?: string;
     }
}

@Injectable()
export class RequestInitialization implements NestMiddleware {
     use(req: Request, _: Response, next: NextFunction) {
          const timeNow = new Date();
          req.request_id = uuid.v1();
          const body = JSON.parse(JSON.stringify(req.body));
          
          //Thu thập thông tin về người gửi request như địa chỉ IP (client), tên máy chủ gửi forward (sourceHostName), tên mạng gửi forward (sourceNetName), và correlation ID từ header của request.
          const client: string | string[] = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          const sourceHostName: string | string[] = req.headers['x-forwarded-for-hostname'] || 'unknown';
          const sourceNetName: string | string[] = req.headers['x-forwarded-for-netname'] || 'unknown';
          const correlationId: string | string[] = req.headers['x-correlation-id'] || uuid.v1();

          req.source_hostname = String(sourceHostName);
          req.source_netname = String(sourceNetName);
          req.correlation_id = String(correlationId);
          req.requested_time = timeNow.getTime();

          const data = {
               sourceHostName,
               sourceNetName,
               request_id: req.request_id,
               correlation_id: correlationId,
               request_time: timeNow,
               requester: client,
               method: req.method,
               path: req.originalUrl,
               url: req.url,
               body,
          };

          logger.info(JSON.stringify(data), {
               tags: ['request'],
          });

          next();
     }
}
