import { Logger } from '@/core/ports/Logger'
import { stringify } from '@/infrastructure/shared/stringify'

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
