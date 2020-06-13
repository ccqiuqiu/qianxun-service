import {Controller, Post, UseGuards, Body, Query, Get} from '@nestjs/common'
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '@nestjs/passport'
import {UserService} from './user.service'
import {UserDto} from '../../dto/user.dto'

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(protected readonly userService: UserService) {
  }

  @ApiResponse({type: UserDto})
  @Post('all')
  all() {
    return this.userService.find()
  }

  @Post('save')
  save(@Body() user: UserDto) {
    return this.userService.save(user)
  }

  @Get('delete')
  delete(@Query('id') id: string) {
    return this.userService.delete(id)
  }

}
