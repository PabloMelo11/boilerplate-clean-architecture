import { left, right } from '@/shared/logic/Either';

import { IUpdateAvatarUserUseCase } from '@/domain/usecases/updateAvatarUser/IUpateAvatarUserUseCase';

import { IUsersRepository } from '@/domain/usecases/_common_/repositories/IUsersRepository';

import { IStorageProvider } from '@/domain/usecases/_common_/providers/IStorageProvider';

import { UpdateAvatarUserRequestDTO } from '@/domain/usecases/updateAvatarUser/dtos/UpdateAvatarUserRequestDTO';
import { UpdateAvatarUserResponseDTO } from '@/domain/usecases/updateAvatarUser/dtos/UpdateAvatarUserResponseDTO';

import { AccountDoesNotExists } from '@/domain/usecases/_common_/errors/AccountDoesNotExists';

class UpdateAvatarUserUseCase implements IUpdateAvatarUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async updateAvatar({
    avatar_file,
    user_id,
  }: UpdateAvatarUserRequestDTO): Promise<UpdateAvatarUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      return left(new AccountDoesNotExists());
    }

    if (user.avatar) {
      await this.storageProvider.delete({
        file: user.avatar,
        folder: 'avatar',
      });
    }

    await this.storageProvider.save({
      file: avatar_file,
      folder: 'avatar',
    });

    user.avatar = avatar_file;

    const updated_user = await this.usersRepository.update(user);

    return right(updated_user);
  }
}

export { UpdateAvatarUserUseCase };
