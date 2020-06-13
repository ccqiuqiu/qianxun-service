/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Controller, Get, UseGuards, Query} from '@nestjs/common'
import {AppService} from './app.service'
import {AuthGuard} from '@nestjs/passport'
import {AuthService} from './modules/auth/auth.service'
import {LoggerService} from './modules/logger/logger.service'
import {ConfigService} from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService,
              private readonly loggerService: LoggerService,
              private readonly configService: ConfigService,
  ) {
    this.loggerService.setContext('AppController')
  }

  @UseGuards(AuthGuard('local'))
  @Get('auth/login')
  async login(@Query('username') username: string, @Query('password') password: string) {
    return this.authService.login({username, password})
  }

  @Get()
  getHello() {
    // throw new Error('错误信息')
    // throw new HttpException('出错了', 123)
    return this.appService.getHello()
  }
}
