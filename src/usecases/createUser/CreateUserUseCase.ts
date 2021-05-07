import { left, right } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { ICreateUserUseCase } from '@/usecases/createUser/ICreateUserUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { IHashProvider } from '@/usecases/_helpers_/providers/IHashProvider';
import { IUUIDProvider } from '@/usecases/_helpers_/providers/IUUIDProvider';

import { CreatedUserResponseDTO } from '@/usecases/createUser/dtos/CreatedUserResponseDTO';
import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

import { AccountAlreadyExistsError } from '@/usecases/_helpers_/errors/AccountAlreadyExists';

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

    await this.usersRepository.create({
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: passwordHash,
      driver_license: user.driver_license,
      avatar: user.avatar,
    });

    return right(user);
  }
}

export { CreateUserUseCase };
