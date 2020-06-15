/**
 * Created by 熊超超 on 2020/6/10.
 */
import {HttpException, Injectable} from '@nestjs/common'
import {UserService} from '../user/user.service'
import {JwtService} from '@nestjs/jwt'
import {RedisService} from '../redis/redis.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({username, password})
    if (user) {
      const {password, ...result} = user
      return result
    }
    return null
  }

  async login(user: any) {
    const captcha = await this.redisService.get('captcha_' + user.captchaCode)
    if (captcha === user.captcha) {
      const payload = {username: user.username, sub: user.id}
      return {
        token: this.jwtService.sign(payload),
      }
    }
    throw new HttpException('验证码错误', 500)
  }
}
