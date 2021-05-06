import { left, right } from '@/shared/logic/Either';

import { IUpdateAvatarUserUseCase } from '@/usecases/updateAvatarUser/IUpateAvatarUserUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { IStorageProvider } from '@/usecases/_helpers_/providers/IStorageProvider';

import { UpdateAvatarUserRequestDTO } from '@/usecases/updateAvatarUser/dtos/UpdateAvatarUserRequestDTO';
import { UpdateAvatarUserResponseDTO } from '@/usecases/updateAvatarUser/dtos/UpdateAvatarUserResponseDTO';

import { AccountDoesNotExists } from '@/usecases/_helpers_/errors/AccountDoesNotExists';

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

    user.props.avatar = avatar_file;

    await this.usersRepository.update(user);

    return right(user);
  }
}

export { UpdateAvatarUserUseCase };
