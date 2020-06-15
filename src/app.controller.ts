/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Controller, Get, UseGuards, Post, Body, Req, CacheTTL} from '@nestjs/common'
import {AppService} from './app.service'
import {AuthGuard} from '@nestjs/passport'
import {AuthService} from './modules/auth/auth.service'
import {LoggerService} from './modules/logger/logger.service'
import * as svgCaptcha from 'svg-captcha'
import {RedisService} from './modules/redis/redis.service'
import {UserLoginDto} from './dto/UserLogin.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService,
              private readonly loggerService: LoggerService,
              private readonly redisService: RedisService,
  ) {
    this.loggerService.setContext('AppController')
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UserLoginDto, @Req() req) {
    return this.authService.login({...user, ...req.user})
  }

  @CacheTTL(1)
  @Get('captcha')
  captcha() {
    const codeConfig = {
      size: 6, // 验证码长度
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
      noise: 2, // 干扰线条的数量
      width: 160,
      height: 50,
      fontSize: 50,
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#eee',
    }
    const captcha = svgCaptcha.create(codeConfig)
    const captchaCode = Math.random().toString().replace('.', '')
    this.redisService.set(`captcha_${captchaCode}`, captcha.text, 5 * 60)
    console.log(captcha.text)
    return {captchaCode, img: captcha.data}
  }

  @Get()
  hello() {
    // throw new Error('错误信息')
    // throw new HttpException('出错了', 123)
    return this.appService.getHello()
  }
}
