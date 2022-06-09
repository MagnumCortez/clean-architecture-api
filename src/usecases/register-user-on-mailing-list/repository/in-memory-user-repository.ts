import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

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
    const user = this.repository.find((user) => {
      return user.email === email
    })

    if (typeof user === 'undefined') {
      return null
    }

    return user
  }

  async findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: UserData): Promise<boolean> {
    return !(await this.findUserByEmail(user.email) === null)
  }
}
