import { injectable } from "inversify";
import pino from "pino";

export interface ILogger {
  info(message: string, ...meta: any[]): void;
  error(message: string | Error, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  debug(message: string, ...meta: any[]): void;
}

@injectable()
export class LoggerService implements ILogger {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL || "info",
      transport: {
        targets: [
          // Pretty printing to console in development
          {
            target: "pino-pretty",
            level: process.env.LOG_LEVEL || "info",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
            },
          },
          // File transport for errors
          {
            target: "pino/file",
            level: "error",
            options: { destination: "error.log" },
          },
          // File transport for all logs
          {
            target: "pino/file",
            level: process.env.LOG_LEVEL || "info",
            options: { destination: "combined.log" },
          },
        ],
      },
    });
  }

  info(message: string, ...meta: any[]): void {
    this.logger.info({ ...meta[0] }, message);
  }

  error(message: string | Error, ...meta: any[]): void {
    if (message instanceof Error) {
      this.logger.error({ err: message, ...meta[0] }, message.message);
    } else {
      this.logger.error({ ...meta[0] }, message);
    }
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn({ ...meta[0] }, message);
  }

  debug(message: string, ...meta: any[]): void {
    this.logger.debug({ ...meta[0] }, message);
  }
}
