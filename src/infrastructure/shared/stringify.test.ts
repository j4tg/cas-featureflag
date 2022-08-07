import { stringify } from './stringify'

test('deberia retornar un objeto como cadena', () => {
  // Arrange
  const object = {
    a: 1,
    b: '2',
    c: new Error('Error')
  }

  // Act
  const string = stringify(object)

  // Assert
  expect(JSON.parse(string)).toMatchObject({
    a: 1,
    b: '2',
    c: {
      message: 'Error',
      stack: expect.stringContaining('Error: Error')
    }
  })
})
