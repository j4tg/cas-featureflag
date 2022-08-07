import 'jest-dynalite/withDb'
import { DynamoDB } from '../DynamoDB'
import { DynamoDBFlagRepository } from './DynamoDBFlagRepository'
import { TABLE_FLAG } from './environment'

test('deberia guardar un flag correctamente', async () => {
  // Arrange
  const dynamodb = new DynamoDB()
  const repository = new DynamoDBFlagRepository(dynamodb)
  const item = {
    key: 'feature-1',
    project: 'project-1',
    environment: 'environment-1',
    isEnabled: true
  }

  // Act
  await repository.put(item)

  const table = await dynamodb.client
    .scan({
      TableName: TABLE_FLAG
    })
    .promise()

  // Assert
  expect(table.Items!.length).toBe(1)
  expect(table.Items![0].key).toBe(item.key)
  expect(table.Items![0].project).toBe(item.project)
  expect(table.Items![0].environment).toBe(item.environment)
  expect(table.Items![0].isEnabled).toBe(item.isEnabled)
  expect(table.Items![0].pk).toBe(item.key)
})
