import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const repo: UserRepository = new InMemoryUserRepository()
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    await usecase.perform({ name, email })
    const addedUser = await repo.findUserByEmail(email)
    expect(addedUser.name).toBe(name)
    expect(addedUser.email).toBe(email)
  })

  test('should not add user with invalid email to mailing list', async () => {
    const repo: UserRepository = new InMemoryUserRepository()
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid.mail.com'
    const response = await (await usecase.perform({ name, email: invalidEmail })).value as Error
    const users = await repo.findAllUsers()
    expect(users).toEqual([])
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name to mailing list', async () => {
    const repo: UserRepository = new InMemoryUserRepository()
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@mail.com'
    const response = await (await usecase.perform({ name: invalidName, email })).value as Error
    const users = await repo.findAllUsers()
    expect(users).toEqual([])
    expect(response.name).toEqual('InvalidNameError')
  })
})
