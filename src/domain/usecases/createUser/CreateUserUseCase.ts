import { left, right } from '@/shared/logic/Either';

import { User } from '@/domain/entities/user/user';

import { ICreateUserUseCase } from '@/domain/usecases/createUser/ICreateUserUseCase';

import { IUsersRepository } from '@/domain/usecases/_common_/repositories/IUsersRepository';

import { IHashProvider } from '@/domain/usecases/_common_/providers/IHashProvider';
import { IUUIDProvider } from '@/domain/usecases/_common_/providers/IUUIDProvider';

import { CreatedUserResponseDTO } from '@/domain/usecases/createUser/dtos/CreatedUserResponseDTO';
import { CreateUserRequestDTO } from '@/domain/usecases/createUser/dtos/CreateUserRequestDTO';

import { AccountAlreadyExistsError } from '@/domain/usecases/_common_/errors/AccountAlreadyExists';

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private uuidProvider: IUUIDProvider,
  ) {}

  async createUser(
    data: CreateUserRequestDTO,
  ): Promise<CreatedUserResponseDTO> {
    const id = this.uuidProvider.generateUUID();
    const userOrError = User.create(data, id);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email.value,
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email.value));
    }

    const passwordHash = await this.hashProvider.generateHash(
      user.password.value,
    );

    const created_user = await this.usersRepository.create({
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: passwordHash,
      driver_license: user.driver_license,
      avatar: user.avatar,
    });

    return right(created_user);
  }
}

export { CreateUserUseCase };
