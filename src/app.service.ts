/**
 * Created by 熊超超 on 2020/6/10.
 */
import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
