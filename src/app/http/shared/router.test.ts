import { mock } from 'jest-mock-extended'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { router } from './router'
import { Logger } from '@/service/logger/Logger'
import { container } from '@/injection/container'
import { ValidationError } from '@/error/ValidationError'

test('deberia invocar la función que coincida con la ruta de metodo get', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler2',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() => Promise.resolve({}))
  const mockNotHandler1 = jest.fn(() => Promise.resolve({}))
  const mockNotHandler2 = jest.fn(() => Promise.resolve({}))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler1',
      handler: mockNotHandler1
    },
    {
      method: 'GET',
      pattern: '/handler2',
      handler: mockHandler
    },
    {
      method: 'GET',
      pattern: '/handler3',
      handler: mockNotHandler2
    }
  ])

  // Act
  await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(mockNotHandler1).not.toHaveBeenCalled()
  expect(mockNotHandler2).not.toHaveBeenCalled()
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia retonar status http 200 por defecto', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() => Promise.resolve({}))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(200)
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia permitir cambiar status http', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() => Promise.resolve({ statusCode: 201 }))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(201)
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia convertir la respuesta a una cadena si el resultado del metodo es un objeto', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() =>
    Promise.resolve({ body: { success: true } })
  )

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.body).toEqual('{"success":true}')
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia devolver error 404 si no coincide ninguna ruta', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const handler = router([])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(response.statusCode).toEqual(404)
  expect(response.body).toEqual('Cannot GET /handler')
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia invocar metodo que coincida con la ruta de metodo post', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'POST'
  })
  const context = mock<Context>()

  const mockGetHandler = jest.fn(() => Promise.resolve({}))
  const mockPostHandler = jest.fn(() => Promise.resolve({}))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockGetHandler
    },
    {
      method: 'POST',
      pattern: '/handler',
      handler: mockPostHandler
    }
  ])

  // Act
  await handler(event, context)

  // Assert
  expect(mockGetHandler).not.toHaveBeenCalled()
  expect(mockPostHandler).toHaveBeenCalled()
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia retornar status http 500 si ocurre un error', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() => Promise.reject(new Error()))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(500)
  expect(loggerMock).toHaveBeenCalled()
})

test('deberia retornar status http 400 si ocurre un error de validación', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() =>
    Promise.reject(new ValidationError('Error'))
  )

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.statusCode).toEqual(400)
  expect(loggerMock).toHaveBeenCalled()
})

test('no deberia transformar la respuesta si esta ya es una cadena de texto', async () => {
  // Arrange
  const loggerMock = jest
    .spyOn(container, 'resolve')
    .mockReturnValue(mock<Logger>())

  const event = mock<APIGatewayEvent>({
    path: '/handler',
    httpMethod: 'GET'
  })
  const context = mock<Context>()

  const mockHandler = jest.fn(() => Promise.resolve({ body: 'test' }))

  const handler = router([
    {
      method: 'GET',
      pattern: '/handler',
      handler: mockHandler
    }
  ])

  // Act
  const response = await handler(event, context)

  // Assert
  expect(mockHandler).toHaveBeenCalled()
  expect(response.body).toEqual('test')
  expect(loggerMock).toHaveBeenCalled()
})
