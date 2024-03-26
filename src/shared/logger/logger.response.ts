import logger from '.';
import { HttpStatus } from '../../common';

export interface ILoggerReponse {
     tags?: string;
     status?: HttpStatus;
     responseData?: any;
     sourceHostName?: string | string[];
     sourceNetName?: string | string[];
     requestId?: string;
     correlationId?: string | string[];
     requestTime?: Date;
     requester?: string | string[];
     method?: any;
     path?: any;
     url?: any;
     body?: any;
}

export const loggerResponse = (params: ILoggerReponse): void => {
     const responseTime = new Date();
     const data = {
          ...params,
          responseTime,
     };

     logger.info(JSON.stringify(data), {
          tags: [`${params.tags}`],
     });
};
