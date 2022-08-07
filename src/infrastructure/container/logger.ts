import { container } from 'tsyringe'
import { Logger } from '@/core/ports/Logger'
import { PrettyLogger } from '@/infrastructure/adapters/logger/pretty/PrettyLogger'
import { JsonLogger } from '@/infrastructure/adapters/logger/json/JsonLogger'

switch (process.env.INJECTION__SERVICE__LOGGER) {
  case 'pretty':
    container.register<Logger>('Logger', PrettyLogger)
    break

  case 'json':
    container.register<Logger>('Logger', JsonLogger)
    break
}
