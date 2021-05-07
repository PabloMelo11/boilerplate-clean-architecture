import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { ShowProfileUserRequestDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

import { IShowProfileUserUseCase } from '@/usecases/showProfileUser/IShowProfileUserUseCase';

class ShowProfileUserController implements Controller {
  constructor(
    private readonly showProfileUserUseCase: IShowProfileUserUseCase,
  ) {}

  async handle({ user_id }: ShowProfileUserRequestDTO): Promise<HttpResponse> {
    try {
      const result = await this.showProfileUserUseCase.loadProfile({ user_id });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const user_view_model = UserViewModel.map(result.value);

      return ok(user_view_model);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ShowProfileUserController };
