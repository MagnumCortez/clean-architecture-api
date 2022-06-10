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

  test('should return all users in the repository', async () => {
    const firstUser = { name: 'first_name', email: 'fname@email.com' }
    const secondUser = { name: 'second_name', email: 'sname@email.com' }
    const sut = await new InMemoryUserRepository()
    await sut.add(firstUser)
    await sut.add(secondUser)
    const users = await sut.findAllUsers()
    expect(users.length).toBe(2)
  })
})
