import { UpdateAvatarUserRequestDTO } from '@/usecases/updateAvatarUser/dtos/UpdateAvatarUserRequestDTO';

import { UpdateAvatarUserResponseDTO } from '@/usecases/updateAvatarUser/dtos/UpdateAvatarUserResponseDTO';

interface IUpdateAvatarUserUseCase {
  updateAvatar(
    data: UpdateAvatarUserRequestDTO,
  ): Promise<UpdateAvatarUserResponseDTO>;
}

export { IUpdateAvatarUserUseCase };
