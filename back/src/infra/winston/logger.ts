import winston = require('winston');
import logObject, { ILogger } from '../../log/logger';


export const logger = winston.createLogger({
    levels: winston.config.npm.levels,

    format: winston.format.combine(
        winston.format.colorize(),
        // winston.format.timestamp({
        //     format: 'YYYY-MM-DD HH:mm:ss',
        // }),
        winston.format.splat(),
        winston.format.simple(),
    ),
    transports: [new winston.transports.Console()],
});



export const logs = (level: string, msg: string, any?: any) => {
    logger[level](`${msg}${!any ? '' : ' ' + JSON.stringify(any)}`);
};


export default class Logger implements ILogger {
    private _logger: winston.Logger;

    constructor() {
        this._logger = logger;
    }


    logInfo(t: logObject) {
        this._logger.info(t.message);
    }

    logError(t: logObject) {
        this._logger.error(t.message);
    }

    logWarn(t: logObject) {
        this._logger.error(t.message);
    }
}

