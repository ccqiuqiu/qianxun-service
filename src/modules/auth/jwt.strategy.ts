/**
 * Created by 熊超超 on 2020/6/10.
 */
import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
// import utils from '../common/constants'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: true, // 忽略过期时间
      secretOrKey: configService.get<JWT>('jwt').secret
    })
  }

  async validate(payload: any) {
    return {userId: payload.sub, username: payload.username}
  }
}
