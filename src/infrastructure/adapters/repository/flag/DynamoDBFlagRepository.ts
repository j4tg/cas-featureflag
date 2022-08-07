import { Flag } from '@/core/ports/repository/flag/Flag'
import { FlagRepository } from '@/core/ports/repository/flag/FlagRepository'

export class DynamoDBFlagRepository implements FlagRepository {
  async put(flag: Flag): Promise<void> {
    console.log(flag)
  }
  async findByProjectAndEnvironment(): Promise<Flag[]> {
    throw new Error('Method not implemented.')
  }
}
