import { left, right } from '@/shared/logic/Either';

import auth from '@/config/auth';

import { UserTokens } from '@/entities/userTokens/userTokens';
import { Email } from '@/entities/user/email';
import { Password } from '@/entities/user/password';

import { IAuthenticateUserUseCase } from '@/usecases/authenticateUser/IAuthenticateUserUseCase';

import { IUsersRepository } from '@/usecases/_helpers_/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@/usecases/_helpers_/repositories/IUsersTokensRepository';

import { ITokenProvider } from '@/usecases/_helpers_/providers/ITokenProvider';
import { IHashProvider } from '@/usecases/_helpers_/providers/IHashProvider';
import { IDateProvider } from '@/usecases/_helpers_/providers/IDateProvider';

import { AuthenticateUserRequestDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';

import {
  AuthenticateUserResponseDTO,
  ResponseDTO,
} from '@/usecases/authenticateUser/dtos/AuthenticateUserResponseDTO';

import { InvalidEmailOrPassword } from '@/usecases/_helpers_/errors/InvalidEmailOrPassword';

class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider,
    private dateProvider: IDateProvider,
  ) {}

  async authenticate({
    email,
    password,
  }: AuthenticateUserRequestDTO): Promise<AuthenticateUserResponseDTO> {
    const {
      expires_in_token,
      expires_in_refresh_token,
      secret_refresh_token,
      secret_token,
      expires_refresh_token_days,
    } = auth;

    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const _email = emailOrError.value;
    const _password = passwordOrError.value;

    const user = await this.usersRepository.findByEmail(_email.value);

    if (!user) {
      return left(new InvalidEmailOrPassword());
    }

    const passwordMatch = await this.hashProvider.compareHash(
      _password.value,
      user.password,
    );

    if (!passwordMatch) {
      return left(new InvalidEmailOrPassword());
    }

    const token = this.tokenProvider.generateToken({
      secret: secret_token,
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = this.tokenProvider.generateToken({
      secret: secret_refresh_token,
      payload: { email },
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    const userTokenOrError = UserTokens.create({
      user_id: user.id,
      token: refresh_token,
      expires_date: refresh_token_expires_date,
      type: 'refresh_token',
    });

    if (userTokenOrError.isLeft()) {
      return left(userTokenOrError.value);
    }

    const userToken: UserTokens = userTokenOrError.value;

    await this.usersTokensRepository.create({
      ...userToken,
      ...userToken.props,
      type: userToken.type,
      expires_date: userToken.expires_date,
    });

    const returnToken: ResponseDTO = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return right(returnToken);
  }
}

export { AuthenticateUserUseCase };
