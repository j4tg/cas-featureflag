import { container } from 'tsyringe'
import { FlagRepository } from '@/core/ports/repository/flag/FlagRepository'
import { DynamoDBFlagRepository } from '@/infrastructure/adapters/repository/flag/DynamoDBFlagRepository'

switch (process.env.INJECTION__REPOSITORY__FLAG) {
  case 'dynamodb':
    container.register<FlagRepository>('FlagRepository', DynamoDBFlagRepository)
    break
}
