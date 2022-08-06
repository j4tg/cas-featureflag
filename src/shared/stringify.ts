import safeStringify from 'fast-safe-stringify'

export function stringify(object?: unknown, space = 4) {
  return safeStringify(object, replacer, space)
}

function replacer(key: string, value: unknown) {
  if (value instanceof Error) {
    const error: Record<string, unknown> = {}
    Object.getOwnPropertyNames(value).forEach((propName) => {
      error[propName] = (value as unknown as Record<string, unknown>)[propName]
    })
    return error
  }
  return value
}
