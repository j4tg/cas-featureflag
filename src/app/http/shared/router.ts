import UrlPattern from 'url-pattern'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { inject, injectable } from 'tsyringe'
import { stringify } from '@/shared/stringify'
import { ValidationError } from '@/error/ValidationError'
import { Logger } from '@/service/logger/Logger'

@injectable()
export class Router {
  private routes: Route[] = []

  constructor(
    @inject('Logger')
    private readonly logger: Logger
  ) {}

  public route(method: HttpMethod, pattern: string, handler: HttpHandler) {
    this.routes.push({ method, pattern, handler })
  }

  public async handler(event: APIGatewayEvent, context: Context) {
    this.logger.debug(`${event.httpMethod} ${event.path}`)

    for (const route of this.routes) {
      if (route.method !== event.httpMethod) {
        continue
      }

      const match = new UrlPattern(route.pattern).match(event.path)
      if (!match) {
        continue
      }

      try {
        const { statusCode, body } = await route.handler({
          event,
          context,
          params: match
        })

        return {
          statusCode: statusCode ?? 200,
          body: typeof body !== 'string' ? JSON.stringify(body) : body
        }
      } catch (error) {
        this.logger.debug('router handler error', error)
        const formatted = this.httpErrorFormatter(error as Error)

        return {
          statusCode: formatted.statusCode,
          body: JSON.stringify(formatted.body)
        }
      }
    }

    return {
      statusCode: 404,
      body: `Cannot ${event.httpMethod} ${event.path}`
    }
  }

  private httpErrorFormatter(error: Error) {
    const debug = JSON.parse(stringify(error))

    let status = 500
    let name = 'Internal Server Error'

    if (error instanceof ValidationError) {
      status = 400
      name = 'Bad Request'
    }

    return {
      statusCode: status,
      body: {
        error: name,
        message: error.message,
        timestamp: new Date().toISOString(),
        debug: debug
      }
    }
  }
}

interface Route {
  method: HttpMethod
  pattern: string
  handler: HttpHandler
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type HttpHandler = {
  ({
    event,
    context,
    params
  }: {
    event: APIGatewayEvent
    context: Context
    params: Record<string, unknown>
  }): Promise<{
    statusCode?: number
    body?: { [key: string]: unknown } | Array<unknown> | string
  }>
}
