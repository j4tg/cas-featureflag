export class ValidationError extends Error {
  innerError?: Error

  constructor(message: string, innerError?: Error) {
    super(message)
    this.name = 'ValidationError'
    this.innerError = innerError
  }
}
