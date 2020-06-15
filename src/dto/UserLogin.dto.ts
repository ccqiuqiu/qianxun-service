/**
 * Created by 熊超超 on 2020/6/12.
 */
import {ApiProperty, PickType} from '@nestjs/swagger'
import {User} from '../entity/user.entity'

export class UserLoginDto extends PickType(User, ['username', 'password']) {
  @ApiProperty()
  captchaCode: string

  @ApiProperty()
  captcha: string
}
