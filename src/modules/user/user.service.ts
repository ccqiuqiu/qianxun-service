/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User} from '../../entity/user.entity'
import {BaseService} from '../../common/BaseService'

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super(usersRepository)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
