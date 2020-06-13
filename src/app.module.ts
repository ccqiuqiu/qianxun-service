/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import config from './common/config'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AuthModule} from './modules/auth/auth.module'
import {UserModule} from './modules/user/user.module'
import {LoggerModule} from './modules/logger/logger.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigService} from '@nestjs/config'
import {DbCustomLogger} from './modules/logger/logger.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env', `env/.env.${process.env.NODE_ENV}`],
      load: [config],
    }),
    LoggerModule,
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule, LoggerModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            ...configService.get('db'),
            logger: new DbCustomLogger()
          }
        },
      }
    ),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
