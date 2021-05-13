import { UpdateAvatarUserRequestDTO } from '@/domain/usecases/updateAvatarUser/dtos/UpdateAvatarUserRequestDTO';

import { UpdateAvatarUserResponseDTO } from '@/domain/usecases/updateAvatarUser/dtos/UpdateAvatarUserResponseDTO';

interface IUpdateAvatarUserUseCase {
  updateAvatar(
    data: UpdateAvatarUserRequestDTO,
  ): Promise<UpdateAvatarUserResponseDTO>;
}

export { IUpdateAvatarUserUseCase };
