import { Email } from './email'

describe('Email validation', () => {
  test('shoud not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud accept valid email', () => {
    const email = 'local@domain.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('shoud not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept domain part larger than 64 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(66) + '@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
