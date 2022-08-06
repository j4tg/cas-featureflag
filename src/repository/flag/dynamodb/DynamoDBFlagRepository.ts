import { Flag } from '../Flag'
import { FlagRepository } from '../FlagRepository'

export class DynamoDBFlagRepository implements FlagRepository {
  async put(flag: Flag): Promise<void> {
    console.log(flag)
  }
  async findByProjectAndEnvironment(): Promise<Flag[]> {
    throw new Error('Method not implemented.')
  }
}
