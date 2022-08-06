import { container } from 'tsyringe'
import { Logger } from '@/service/logger/Logger'
import { PrettyLogger } from '@/service/logger/pretty/PrettyLogger'
import { JsonLogger } from '@/service/logger/json/JsonLogger'

switch (process.env.SERVICE__LOGGER) {
  case 'pretty':
    container.register<Logger>('Logger', PrettyLogger)
    break

  case 'json':
    container.register<Logger>('Logger', JsonLogger)
    break
}
