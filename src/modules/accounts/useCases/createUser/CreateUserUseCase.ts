import { Either, left, right } from '@/core/logic/Either';

import { ICreateUserDTO } from '@/dtos/accounts/ICreateUserDTO';
import { IUsersRepository } from '@/infra/repositories/accounts/IUsersRepository';

import { User } from '../../domain/user/user';
import { Email } from '../../domain/user/email';
import { InvalidEmailError } from '../../domain/user/errors/InvalidEmailError';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExists';

type CreatedUserResponse = Either<InvalidEmailError, User>;

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<CreatedUserResponse> {
    const emailOrError = Email.create(data.email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const userOrError = User.create(data);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email));
    }

    await this.usersRepository.create(user);

    return right(user);
  }
}

export { CreateUserUseCase };
