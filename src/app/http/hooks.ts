import { APIGatewayEvent, Context } from 'aws-lambda'
import { container } from '@/injection/container'
import { SyncAllEnvironmentHandler } from '@/usecase/hook/sync-all-environment/SyncAllEnvironmentHandler'
import { Router } from './shared/Router'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const router = container.resolve(Router)

  router.route('GET', '/hooks/flags/:project/environment/all', async () => {
    await container
      .resolve(SyncAllEnvironmentHandler)
      .execute(JSON.parse(event.body || '{}'))
    return { body: 'success' }
  })

  return await router.handler(event, context)
}
