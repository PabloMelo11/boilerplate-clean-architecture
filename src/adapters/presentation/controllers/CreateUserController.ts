import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

import { ICreateUserUseCase } from '@/usecases/createUser/ICreateUserUseCase';

class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    request: CreateUserRequestDTO,
  ): Promise<HttpResponse<UserViewModel>> {
    try {
      const result = await this.createUserUseCase.createUser(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const user = result.value;

      const userView = UserViewModel.map(user);

      return ok(userView);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { CreateUserController };
