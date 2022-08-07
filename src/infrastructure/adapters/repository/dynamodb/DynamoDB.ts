import AWSDynamoDB from 'aws-sdk/clients/dynamodb'
import { injectable } from 'tsyringe'

@injectable()
export class DynamoDB {
  readonly client: AWSDynamoDB.DocumentClient
  readonly db: AWSDynamoDB

  constructor() {
    let options = {}

    if (process.env.NODE_ENV === 'test') {
      options = {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: 'local'
      }
    } else if (process.env.IS_OFFLINE) {
      options = {
        endpoint: 'http://localhost:8000',
        region: 'local'
      }
    }

    this.client = new AWSDynamoDB.DocumentClient(options)
    this.db = new AWSDynamoDB(options)
  }
}
