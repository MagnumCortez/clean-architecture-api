import { UserRepository } from '../../../../src/usecases/register-user-on-mailing-list/ports'
import { UserData } from '../../../../src/entities'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor () {
    this.repository = []
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const user = this.repository.find(user => user.email === email)
    return user || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    return !(await this.findUserByEmail(user.email) === null)
  }
}
