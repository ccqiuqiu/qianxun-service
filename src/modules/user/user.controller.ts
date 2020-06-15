import {
  Controller,
  Post,
  UseGuards,
  Body,
  Query,
  Get,
  CacheKey,
  CacheTTL,
} from '@nestjs/common'
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '@nestjs/passport'
import {UserService} from './user.service'
import {UserSelectDto} from '../../dto/UserSelect.dto'
import {UserSaveDto} from '../../dto/UserSave.dto'
import {RedisService} from '../redis/redis.service'

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    protected readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {
  }

  @ApiResponse({type: UserSelectDto})
  @CacheKey('custom_key')
  @CacheTTL(5)
  @Post('all')
  async all() {
    const users = await this.userService.find()
    this.redisService.set('users', '123', 100)
    return users.map(user => UserSelectDto.fromEntity(user))
  }

  @Post('save')
  async save(@Body() user: UserSaveDto) {
    const savedUser = await this.userService.save(user)
    delete savedUser.password
    return savedUser
  }

  @Get('delete')
  delete(@Query('id') id: string) {
    return this.userService.delete(id)
  }

}
