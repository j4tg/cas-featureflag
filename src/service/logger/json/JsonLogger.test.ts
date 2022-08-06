import { JsonLogger } from './JsonLogger'

test('should log a message', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new JsonLogger()

  // Act
  logger.debug('message')

  // Assert
  expect(log).toHaveBeenCalledWith(
    expect.objectContaining({
      date: expect.any(String),
      message: 'message',
      details: []
    })
  )
})

test('should log a message with a detail', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new JsonLogger()

  // Act
  logger.debug('message', 'detail')

  // Assert
  expect(log).toHaveBeenCalledWith(
    expect.objectContaining({
      date: expect.any(String),
      message: 'message',
      details: ['detail']
    })
  )
})

test('should log a message with a object detail stringified', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new JsonLogger()

  // Act
  logger.debug('message', {})

  // Assert
  expect(log).toHaveBeenCalledWith(
    expect.objectContaining({
      date: expect.any(String),
      message: 'message',
      details: ['{}']
    })
  )
})
