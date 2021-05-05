import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { ShowProfileUserDTO } from '@/adapters/presentation/controllers/showProfileUser/dtos/ShowProfileUserDTO';

import { IShowProfileUserUseCase } from '@/usecases/showProfileUser/IShowProfileUserUseCase';

class ShowProfileUserController implements Controller {
  constructor(
    private readonly showProfileUserUseCase: IShowProfileUserUseCase,
  ) {}

  async handle({ user_id }: ShowProfileUserDTO): Promise<HttpResponse> {
    try {
      const result = await this.showProfileUserUseCase.loadProfile(user_id);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return ok(UserViewModel.map(result.value));
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ShowProfileUserController };
