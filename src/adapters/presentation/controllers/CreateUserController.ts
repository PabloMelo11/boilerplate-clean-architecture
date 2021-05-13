import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { Validation } from '@/adapters/presentation/protocols/Validation';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { CreateUserRequestDTO } from '@/domain/usecases/createUser/dtos/CreateUserRequestDTO';

import { ICreateUserUseCase } from '@/domain/usecases/createUser/ICreateUserUseCase';

class CreateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  async handle(
    request: CreateUserRequestDTO,
  ): Promise<HttpResponse<UserViewModel>> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return clientError(error);
      }

      const result = await this.createUserUseCase.createUser(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const user = result.value;

      const user_view_model = UserViewModel.map(user);

      return ok(user_view_model);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { CreateUserController };
