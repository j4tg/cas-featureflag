import { z } from 'zod'
import { SyncAllEnvironment } from './SyncAllEnvironment'
import { Request } from './Request'
import { ValidationError } from '@/error/ValidationError'
import { injectable } from 'tsyringe'

@injectable()
export class SyncAllEnvironmentHandler {
  private schema: z.ZodType<Request> = z.object({
    project: z.string(),
    flags: z.array(
      z.object({
        key: z.string(),
        environment: z.string(),
        isEnabled: z.boolean()
      })
    )
  })

  constructor(private usecase: SyncAllEnvironment) {}

  async execute(request: unknown) {
    const result = this.schema.safeParse(request)
    if (!result.success) {
      throw new ValidationError('Invalid request', result.error)
    }

    await this.usecase.execute(request as Request)
  }
}
