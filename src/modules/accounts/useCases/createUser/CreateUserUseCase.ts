import { Either, left, right } from '@/core/logic/Either';

import { IUsersRepository } from '@/infra/repositories/accounts/IUsersRepository';

import { User } from '../../domain/user/user';
import { Email } from '../../domain/user/email';
import { Password } from '../../domain/user/password';

import { InvalidEmailError } from '../../domain/user/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '../../domain/user/errors/InvalidPasswordLength';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExists';

type CreatedUserResponse = Either<
  AccountAlreadyExistsError | InvalidEmailError | InvalidPasswordLengthError,
  User
>;

type ICreateUserDTO = {
  name: string;
  password: string;
  email: string;
  driver_license: string;

  avatar?: string;
};

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<CreatedUserResponse> {
    const emailOrError = Email.create(data.email);
    const passwordOrError = Password.create(data.password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
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
