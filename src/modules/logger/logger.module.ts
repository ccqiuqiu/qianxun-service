/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Global, Module} from '@nestjs/common'
import {LoggerService} from './logger.service'

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
}
