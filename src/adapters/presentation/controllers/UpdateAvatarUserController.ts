import { Controller } from '@/adapters/presentation/protocols/Controller';

import {
  HttpResponse,
  clientError,
  serverError,
  ok,
} from '@/adapters/presentation/protocols/HttpResponse';

import { UserViewModel } from '@/adapters/presentation/controllers/views/UserViewModel';

import { UpdateAvatarUserRequestDTO } from '@/domain/usecases/updateAvatarUser/dtos/UpdateAvatarUserRequestDTO';

import { IUpdateAvatarUserUseCase } from '@/domain/usecases/updateAvatarUser/IUpateAvatarUserUseCase';

class UpdateAvatarUserController implements Controller {
  constructor(
    private readonly updateAvatarUserUseCase: IUpdateAvatarUserUseCase,
  ) {}

  async handle({
    avatar_file,
    user_id,
  }: UpdateAvatarUserRequestDTO): Promise<HttpResponse<UserViewModel>> {
    try {
      const result = await this.updateAvatarUserUseCase.updateAvatar({
        avatar_file,
        user_id,
      });

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

export { UpdateAvatarUserController };
