import { Email } from '../../src/entities'

describe('Email validation', () => {
  test('shoud not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
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
    const email = 'l'.repeat(65) + '@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept empty local part', () => {
    const email = '@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept empty domain', () => {
    const email = 'local@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept domain with a part larger than 63 chars', () => {
    const email = 'local@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept local part with invalid char', () => {
    const email = 'some space@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept local part with two dots', () => {
    const email = 'two..dots@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept local part with ending dot', () => {
    const email = 'ending.dot.@domain.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('shoud not accept email without  at-sign', () => {
    const email = 'localdomain.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
