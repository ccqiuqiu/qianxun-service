/**
 * Created by 熊超超 on 2020/6/11.
 */
import {Entity, Column} from 'typeorm'
import {ApiProperty} from '@nestjs/swagger'
import {BaseEntity} from '../common/BaseEntity'

@Entity()
export class User extends BaseEntity {

  @ApiProperty()
  @Column()
  username: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty({required: false})
  @Column()
  name: string

  @ApiProperty({required: false})
  @Column({nullable: true, default: true})
  status: boolean
}
