export type Request = {
  project: string
  flags: Array<{
    key: string
    environment: string
    isEnabled: boolean
  }>
}
