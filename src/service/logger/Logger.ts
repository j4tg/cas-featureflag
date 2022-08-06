export interface Logger {
  debug: (message: string, ...details: unknown[]) => void
}
