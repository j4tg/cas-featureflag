import { Logger } from '../Logger'
import { stringify } from '@/shared/stringify'

export class JsonLogger implements Logger {
  debug(message: string, ...details: unknown[]): void {
    console.log({
      date: new Date().toISOString(),
      message,
      details: details.map((detail) => {
        if (typeof detail === 'object') {
          detail = stringify(detail)
        }
        return detail
      })
    })
  }
}
