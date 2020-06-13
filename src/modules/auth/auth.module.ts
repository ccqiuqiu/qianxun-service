/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LocalStrategy} from './local.strategy'
import {JwtStrategy} from './jwt.strategy'
import {UserModule} from '../user/user.module'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {ConfigService} from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwt = configService.get<JWT>('jwt')
        return {
          secret: jwt.secret,
          signOptions: {expiresIn: jwt.expiresIn}
        }
      },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
