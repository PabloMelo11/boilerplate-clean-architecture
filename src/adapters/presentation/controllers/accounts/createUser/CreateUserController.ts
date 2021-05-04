import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { ICreateUserUseCase } from '@/modules/accounts/useCases/createUser/ICreateUserUseCase';
import { UserViewModel } from '@/adapters/presentation/controllers/accounts/views/UserViewModel';

import { ICreateUserControllerDTO } from '@/adapters/presentation/controllers/accounts/createUser/dtos/ICreateUserControllerDTO';

class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

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
