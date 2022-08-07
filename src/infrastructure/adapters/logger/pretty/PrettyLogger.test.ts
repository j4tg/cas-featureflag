import { PrettyLogger } from './PrettyLogger'

test('should log a message', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new PrettyLogger()

  // Act
  logger.debug('message')

  // Assert
  expect(log).toHaveBeenCalledWith(expect.stringMatching(/message/))
})

test('should log a message with a detail', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new PrettyLogger()

  // Act
  logger.debug('message', 'detail')

  // Assert
  expect(log).toHaveBeenCalledWith(
    expect.stringMatching(/message/),
    expect.stringMatching(/detail/)
  )
})

test('should log a message with a object detail', () => {
  // Arrange
  const log = jest.spyOn(console, 'log').mockReturnValue()
  const logger = new PrettyLogger()

  // Act
  logger.debug('message', {})

  // Assert
  expect(log).toHaveBeenCalledWith(
    expect.stringMatching(/message/),
    expect.stringMatching(/{}/)
  )
})
