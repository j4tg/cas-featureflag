// import { FlagRepository } from '@/repository/flag/FlagRepository'
import { injectable } from 'tsyringe'
import { Request } from './Request'

@injectable()
export class SyncAllEnvironment {
  // constructor(private repository: FlagRepository) {}

  async execute(data: Request) {
    console.log(data)
    // for (const flag of data.flags) {
    //   await this.repository.put({
    //     project: data.project,
    //     key: flag.key,
    //     environment: flag.environment,
    //     isEnabled: flag.isEnabled
    //   })
    // }
  }
}
