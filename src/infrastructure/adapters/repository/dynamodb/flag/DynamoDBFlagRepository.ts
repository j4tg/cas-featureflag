import { Flag } from '@/core/ports/repository/flag/Flag'
import { FlagRepository } from '@/core/ports/repository/flag/FlagRepository'
import { DynamoDB } from '../DynamoDB'
import { TABLE_FLAG } from './environment'

export class DynamoDBFlagRepository implements FlagRepository {
  constructor(private dynamodb: DynamoDB) {}

  async put(flag: Flag): Promise<void> {
    await this.dynamodb.client
      .put({
        TableName: TABLE_FLAG,
        Item: {
          pk: flag.key,
          project: flag.project,
          environment: flag.environment,
          key: flag.key,
          isEnabled: flag.isEnabled
        }
      })
      .promise()
  }
  async findByProjectAndEnvironment(): Promise<Flag[]> {
    throw new Error('Method not implemented.')
  }
}
