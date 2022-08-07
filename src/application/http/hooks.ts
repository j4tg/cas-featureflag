import { container } from '@/infrastructure/injection'
import { SyncAllEnvironmentHandler } from '@/core/usecase/hook/sync-all-environment/SyncAllEnvironmentHandler'
import { router } from './shared/Router'

export const handler = router([
  {
    method: 'GET',
    pattern: '/hooks/flags/:project/environment/all',
    handler: async ({ event, params }) => {
      await container.resolve(SyncAllEnvironmentHandler).execute({
        project: params.project,
        flags: JSON.parse(event.body || '[]')
      })
      return { body: 'success' }
    }
  }
])
