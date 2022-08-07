import { Flag } from './Flag'

export interface FlagRepository {
  put(flag: Flag): Promise<void>
  findByProjectAndEnvironment(): Promise<Flag[]>
}
