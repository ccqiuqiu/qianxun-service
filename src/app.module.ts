/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Module, CacheModule, CacheInterceptor} from '@nestjs/common'
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
import * as redisStore from 'cache-manager-redis-store'
import {APP_INTERCEPTOR} from '@nestjs/core'
import {RedisModule} from './modules/redis/redis.module'

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
            logger: new DbCustomLogger(),
          }
        },
      }
    ),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redis = configService.get('redis')
        const cache = configService.get('cache')
        return {
          store: redisStore,
          host: redis.host,
          port: redis.port,
          ttl: cache.ttl,
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide: APP_INTERCEPTOR, useClass: CacheInterceptor},
  ],
})
export class AppModule {
}
