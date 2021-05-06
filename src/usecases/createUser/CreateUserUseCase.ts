import { left, right } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { ICreateUserUseCase } from '@/usecases/createUser/ICreateUserUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';

import { IHashProvider } from '@/usecases/_helpers_/providers/IHashProvider';

import { CreatedUserResponseDTO } from '@/usecases/createUser/dtos/CreatedUserResponseDTO';
import { CreateUserRequestDTO } from '@/usecases/createUser/dtos/CreateUserRequestDTO';

import { AccountAlreadyExistsError } from '@/usecases/_helpers_/errors/AccountAlreadyExists';

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async createUser(
    data: CreateUserRequestDTO,
  ): Promise<CreatedUserResponseDTO> {
    const userOrError = User.create(data);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email));
    }

    const passwordHash = await this.hashProvider.generateHash(user.password);

    await this.usersRepository.create({
      ...user.props,
      ...user,
      email: user.email,
      password: passwordHash,
    });

    return right(user);
  }
}

export { CreateUserUseCase };
