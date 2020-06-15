/**
 * Created by 熊超超 on 2020/6/12.
 */
import {OmitType} from '@nestjs/swagger'
import {User} from '../entity/user.entity'

export class UserSelectDto extends OmitType(User, ['password']) {

  static fromEntity(user: User) {
    const {password, ...other} = user
    return other
  }
}
