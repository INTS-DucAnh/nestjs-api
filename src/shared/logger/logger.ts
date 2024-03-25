// import { Injectable, LoggerService } from '@nestjs/common';
// import { isString } from 'class-validator';
// import { LoggerType } from '../types';

// @Injectable()
// export class LoggerWinston implements LoggerService {
//     sensitiveKeys = ['password'];

//     log() {}

//     error(message: LoggerType) {
//         if (!isString(message)) {
//             message.params = this.filterSensitiveInfo(message.params);
//         }

//     }

//     warn(message: LoggerType) {
//         if (!isString(message)) {
//             message.params = this.filterSensitiveInfo(message.params);
//         }
//     }

//     debug(message: LoggerType) {
//         if (!isString(message)) {
//             message.params = this.filterSensitiveInfo(message.params);
//         }
//     }

//     verbose(message: LoggerType) {
//         if (!isString(message)) {
//             message.params = this.filterSensitiveInfo(message.params);
//         }
//     }

//     filterSensitiveInfo(params: any) {
//         const filteredObj = Object.fromEntries(
//             Object.entries(params).filter(
//                 ([key]) => !this.sensitiveKeys.includes(key),
//             ),
//         );

//         return filteredObj;
//     }
// }
