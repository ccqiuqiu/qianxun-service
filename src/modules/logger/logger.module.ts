/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Module} from '@nestjs/common'
import {LoggerService} from './logger.service'

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
}
