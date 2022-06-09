import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const sut = new InMemoryUserRepository()
    const user = await sut.findUserByEmail('nobody@email.com')
    expect(user).toBeNull()
  })
})
