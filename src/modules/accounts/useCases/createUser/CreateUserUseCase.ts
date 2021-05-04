import { left, right } from '@/shared/logic/Either';

import { User } from '@/entities/user/user';

import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';

import { AccountAlreadyExistsError } from '@/modules/accounts/useCases/errors/AccountAlreadyExists';

import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';
import { ICreatedUserResponseDTO } from './dtos/ICreatedUserResponseDTO';

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IUserPropsDTO): Promise<ICreatedUserResponseDTO> {
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
