/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import * as Redis from 'ioredis'

@Injectable()
export class RedisService {
  protected readonly redis

  constructor(
    protected readonly configService: ConfigService,
  ) {
    this.redis = new Redis(configService.get('redis'))
  }

  set(key: any, value: any, maxAge: number = 20 * 60) {
    this.redis.set(key, typeof value === 'string' ? value : JSON.stringify(value), 'EX', maxAge)
  }

  expire(key: any, maxAge: number = 20 * 60) {
    this.redis.expire(key, maxAge)
  }

  del(key: any) {
    this.redis.del(key)
  }

  async get(key: any) {
    const data = await this.redis.get(key)
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
}
