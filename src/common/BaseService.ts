/**
 * Created by 熊超超 on 2020/6/12.
 */
import {Repository, TransactionRepository} from 'typeorm'

export class BaseService<Model> {
  protected readonly repository

  constructor(@TransactionRepository() repository: Repository<Model>) {
    this.repository = repository
  }

  findOne(query: any): Promise<Model> {
    return this.repository.findOne(query)
  }

  find(options: any = {}): Promise<Model[]> {
    return this.repository.find(options)
  }

  save(model: Model) {
    return this.repository.save(model)
  }

  delete(id: string) {
    return this.repository.delete(id)
  }

}
