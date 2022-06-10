import { UserData } from '@/entities'
import { UseCase } from '@/usecases/ports'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { ok, badRequest, unprocessableEntity, serverError } from '@/web-controllers/utils'
import { MissingParamError } from '@/web-controllers/errors'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'email']
      const missingParams = requiredParams.filter((_, idx) => !request.body[requiredParams[idx]])
      if (missingParams.length) {
        return unprocessableEntity(new MissingParamError(missingParams.join(', ')))
      }

      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return ok(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
