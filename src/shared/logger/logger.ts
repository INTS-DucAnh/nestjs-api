import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { isString } from 'class-validator';
import { LoggerType, Message } from '../types';

const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] - ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ],
});

const combinedLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] - ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/combine.log',
            level: 'debug',
        }),
    ],
});

@Injectable()
export class LoggerWinston implements LoggerService {
    constructor() {}

    sensitiveKeys = ['password'];

    log() {}

    error(message: LoggerType) {
        if (!isString(message)) {
            message.params = this.filterSensitiveInfo(message.params);
        }

        errorLogger.error(
            isString(message) ? message : JSON.stringify(message),
        );
    }

    warn(message: LoggerType) {
        if (!isString(message)) {
            message.params = this.filterSensitiveInfo(message.params);
        }

        combinedLogger.warn(
            isString(message) ? message : JSON.stringify(message),
        );
    }

    debug(message: LoggerType) {
        if (!isString(message)) {
            message.params = this.filterSensitiveInfo(message.params);
        }

        combinedLogger.debug(
            isString(message) ? message : JSON.stringify(message),
        );
    }

    verbose(message: LoggerType) {
        if (!isString(message)) {
            message.params = this.filterSensitiveInfo(message.params);
        }

        combinedLogger.verbose(
            isString(message) ? message : JSON.stringify(message),
        );
    }

    filterSensitiveInfo(params: any) {
        const filteredObj = Object.fromEntries(
            Object.entries(params).filter(
                ([key]) => !this.sensitiveKeys.includes(key),
            ),
        );

        return filteredObj;
    }
}

function getOptions(message?: Message): winston.LoggerOptions {
    return {
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS',
            }),
            winston.format.printf((info: winston.Logform.TransformableInfo) => {
                let tags = '';
                if (info.tags && Array.isArray(info.tags)) {
                    tags = info.tags.map((t) => `[${t}]`).join('');
                }
                return `${info.timestamp} [${info.level}]${tags}: ${info.message}`;
            }),
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'logs/info.log',
                level: 'info',
            }),
        ],
        exitOnError: false,
    };
}

const logger = winston.createLogger(getOptions());
export default logger;
