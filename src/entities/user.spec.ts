import { User } from '.'
import { left } from '../shared/either'
import { InvalidNameError, InvalidEmailError } from './errors'

describe('User domain entity', () => {
  test('shoud not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid.email.com'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError(invalidEmail)))
  })

  test('shoud not create user with invalid name', () => {
    const invalidName = '0        '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })

  test('shoud not create user with invalid name (too many characters)', () => {
    const invalidName = 'U'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })
})
