import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const sut = new InMemoryUserRepository()
    const user = await sut.findUserByEmail('nobody@email.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const name = 'any_name'
    const email = 'any@email.com'
    const sut = await new InMemoryUserRepository()
    await sut.add({ name, email })
    const user = await sut.findUserByEmail(email)
    expect(user.name).toBe(name)
  })
})
