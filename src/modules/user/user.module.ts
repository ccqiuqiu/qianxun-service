/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserService} from './user.service'
import {User} from '../../entity/user.entity'
import {UserController} from './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
