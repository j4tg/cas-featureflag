import { Logger } from '../Logger'
import { stringify } from '@/shared/stringify'

export class PrettyLogger implements Logger {
  private readonly color = {
    message: '\x1b[36m',
    detail: '\x1b[90m',
    reset: '\x1b[0m'
  }

  debug(message: string, ...details: unknown[]): void {
    console.log(
      `${this.color.message}${message}${this.color.reset}`,
      ...details.map((detail) => {
        if (typeof detail === 'object') {
          detail = stringify(detail)
        }

        return `${this.color.detail}${detail}${this.color.reset}`
      })
    )
  }
}
