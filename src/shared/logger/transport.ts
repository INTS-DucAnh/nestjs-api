import * as Transport from 'winston-transport';
import dgram from 'dgram';
import net from 'net';

export interface ServerLogstashInfomation {
     host: string;
     port: number;
     protocol: 'udp' | 'tcp';
}

export type LogstashTransportOptions = ServerLogstashInfomation &
     Transport.TransportStreamOptions & {
          module: string;
     };

export class LogstashTransport extends Transport {
     private host: string;
     private port: number;
     private protocol: 'udp' | 'tcp';
     private module: string;

     constructor(opts: LogstashTransportOptions) {
          super(opts);
          this.host = opts.host;
          this.port = opts.port;
          this.protocol = opts.protocol;
          this.module = opts.module;
     }

     public log(info: any, next: () => void) {
          setImmediate(() => {
               this.emit('logged', info);
          });
          if (this.protocol === 'tcp') {
               this.sendLogByTcp(info);
          } else {
               this.sendLogByUdp(info);
          }
          next();
     }

     sendLogByTcp(info: any): void {
          const message = this.getMessage(info);
          const client = net
               .createConnection({ host: this.host, port: this.port }, function () {
                    client.write(message, (err) => {
                         client.destroy();
                         if (err) {
                              throw err;
                         }
                    });
               })
               .on('error', function (err) {
                    throw err;
               });
     }

     sendLogByUdp(info: any): void {
          const message = this.getMessage(info);
          const data = Buffer.from(message);

          const client = dgram.createSocket('udp4');
          client.send(data, this.port, this.host, function (error) {
               client.close();
               if (error) {
                    throw error;
               }
          });
     }

     getMessage(info: any): string {
          if (info.exception) {
               info = {
                    message: info.message,
                    level: info.level,
                    tags: ['exception'],
               };
          }
          if (info.tags) {
               info['@tags'] = info.tags;
               delete info.tags;
          }
          if (info.level) {
               info['@level'] = info.level;
               delete info.level;
          }
          info['@module'] = this.module;
          return JSON.stringify(info);
     }
}
