import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { CreateUserUseCase } from '@/modules/accounts/useCases/createUser/CreateUserUseCase';
import { UserViewModel } from '@/adapters/presentation/controllers/accounts/views/UserViewModel';

import { ICreateUserControllerDTO } from '@/modules/accounts/useCases/createUser/dtos/ICreateUserControllerDTO';

class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: ICreateUserControllerDTO,
  ): Promise<HttpResponse<UserViewModel>> {
    try {
      const result = await this.createUserUseCase.execute(request);

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
