/**
 * Created by 熊超超 on 2020/6/10.
 */
import {
  Injectable, NestInterceptor, ExecutionContext,
  CallHandler, HttpStatus,
} from '@nestjs/common'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'
import {Request, Response} from 'express'
import {LoggerService} from '../modules/logger/logger.service'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, MyResponse<T>> {
  constructor(readonly loggerService: LoggerService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<MyResponse<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    return next.handle().pipe(
      map(data => {
        return {
          code: HttpStatus.OK,
          data: data,
          timestamp: new Date().toISOString(),
        }
      }),
      tap(data => {
        this.loggerService.requestLog(request)
        this.loggerService.responseLog(response, data)
      }),
    )
  }
}
