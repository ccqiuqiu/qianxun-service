/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Injectable, Scope, Logger} from '@nestjs/common'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import {Request, Response} from 'express'
import {Logger as DbLogger, QueryRunner} from 'typeorm'

const transport = new DailyRotateFile({
  filename: 'logs/log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true, // 是否zip压缩
  maxSize: '50m', // 单个日志文件最大尺寸
  maxFiles: '30d', // 日志保留天数
})
const myFormat = winston.format.printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`
})

const {timestamp, combine, splat} = winston.format

const logger = winston.createLogger({
  format: combine(
    splat(),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console(),
    transport,
  ]
})

@Injectable({scope: Scope.TRANSIENT})
export class LoggerService extends Logger {
  log(message: string, context?: string) {
    super.log(message, context)
  }

  warn(message: string, context: string = this.context) {
    this.logger('warn', message, context)
  }

  error(message: string, context: string = this.context) {
    this.logger('error', message, context)
  }

  debug(message: string, context: string = this.context) {
    super.debug(message, context)
  }

  verbose(message: string, context: string = this.context) {
    super.verbose(message, context)
  }

  logger(level: string, message: string, context: string, ...args) {
    logger.log(level, `[%s] ${message}`, context || 'APP', ...args)
  }

  requestLog(request: Request) {
    logger.log('info', `[%s] %s %s %s %s`, 'HTTP',
      request.httpVersion, request.method, request.url,
      JSON.stringify({
        query: request.query,
        params: request.params,
        body: request.body,
      })
    )
  }

  responseLog(response: Response, data: any) {
    logger.log('info', `[%s] %s %s`, 'HTTP', response.statusCode, JSON.stringify(data))
  }
}

export class DbCustomLogger implements DbLogger {

  log(level: 'log' | 'info' | 'warn', message: any): any {
    logger.log(level, `[%s] %s`, 'DB', message)
  }

  logMigration(message: string): any {
    logger.log('info', `[%s] %s`, 'DB', message)
  }

  logQuery(query: string, parameters?: any[]): any {
    logger.log('info', `[%s] %s %s`, 'DB', query, parameters || '')
  }

  logQueryError(error: string, query: string, parameters?: any[]): any {
    logger.log('error', `[%s] %s %s %s`, 'DB', query, parameters || '', error)
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): any {
    logger.log('warn', `[%s] %s %s %s`, 'DB', query, parameters || '', time)
  }

  logSchemaBuild(message: string): any {
    logger.log('info', `[%s] %s`, 'DB', message)
  }

}
