import { container } from 'tsyringe'
import { FlagRepository } from '@/repository/flag/FlagRepository'
import { DynamoDBFlagRepository } from '@/repository/flag/dynamodb/DynamoDBFlagRepository'

switch (process.env.INJECTION__REPOSITORY__FLAG) {
  case 'dynamodb':
    container.register<FlagRepository>('FlagRepository', DynamoDBFlagRepository)
    break
}
