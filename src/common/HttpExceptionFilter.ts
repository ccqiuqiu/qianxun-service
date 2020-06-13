/**
 * Created by 熊超超 on 2020/6/10.
 */
import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common'
import {Response} from 'express'
import {LoggerService} from '../modules/logger/logger.service'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(readonly loggerService: LoggerService) {
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const code = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR
    let status = exception.getStatus ? exception.getStatus() : code
    if (!HttpStatus[status]) {
      status = HttpStatus.INTERNAL_SERVER_ERROR
    }
    this.loggerService.error(exception.stack)
    response
      .status(status)
      .json({
        code: code,
        message: exception.message,
        timestamp: new Date().toISOString(),
      })
  }
}
