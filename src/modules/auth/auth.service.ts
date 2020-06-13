/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Injectable} from '@nestjs/common'
import {UserService} from '../user/user.service'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({username, password})
    if (user) {
      const {password, ...result} = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.id}
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
