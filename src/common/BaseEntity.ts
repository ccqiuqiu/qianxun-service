/**
 * Created by 熊超超 on 2020/6/12.
 */
import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import {ApiProperty} from '@nestjs/swagger'

export class BaseEntity {
  @ApiProperty({required: false})
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({select: false})
  public addTime?: number

  @UpdateDateColumn({select: false})
  public updateTime?: number

  constructor(id?: string) {
    if (id) {
      this.id = id
    }
  }
}
