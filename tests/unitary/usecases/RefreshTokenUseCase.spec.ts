import { Left } from '@/shared/logic/Either';
import { UserTokens } from '@/domain/entities/userTokens/userTokens';

import { UsersTokensRepositoryInMemory } from '@/infra/repositories/inMemory/UsersTokensRepository';

import { TokenProviderInMemory } from '@/infra/providers/TokenProvider/inMemory/TokenProvider';
import { DateProviderInMemory } from '@/infra/providers/DateProvider/inMemory/DateProvider';
import { UUIDProviderInMemory } from '@/infra/providers/UUIDProvider/inMemory/UUIDProvider';

import { RefreshTokenUseCase } from '@/domain/usecases/refreshToken/RefreshTokenUseCase';

import { InvalidTypeError } from '@/domain/entities/_common_/errors/InvalidTypeError';
import { RefreshTokenDoesNotExists } from '@/domain/usecases/_common_/errors/RefreshTokenDoesNotExists';

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let tokenProviderInMemory: TokenProviderInMemory;
let dateProviderInMemory: DateProviderInMemory;
let uuidProviderInMemory: UUIDProviderInMemory;

let refreshTokenUseCase: RefreshTokenUseCase;

const email = 'johndoe@example.com';

describe('Refresh token use case', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    tokenProviderInMemory = new TokenProviderInMemory();
    dateProviderInMemory = new DateProviderInMemory();
    uuidProviderInMemory = new UUIDProviderInMemory();

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      tokenProviderInMemory,
      dateProviderInMemory,
      uuidProviderInMemory,
    );
  });

  it('should be able to refresh token and return new token and new refresh token', async () => {
    const user_id = uuidProviderInMemory.generateUUID();
    const expires_date = '30d';

    const refresh_token_id = uuidProviderInMemory.generateUUID();
    const expires_date_refresh_token = dateProviderInMemory.addDays(30);

    const refresh_token = tokenProviderInMemory.generateToken({
      secret: 'test',
      payload: { email },
      subject: user_id,
      expiresIn: expires_date,
    });

    await usersTokensRepositoryInMemory.create({
      id: refresh_token_id,
      user_id,
      token: refresh_token,
      type: 'refresh_token',
      expires_date: expires_date_refresh_token,
    });

    const new_fresh_token = await refreshTokenUseCase.createNewRefreshToken({
      refresh_token: refresh_token,
    });

    expect(new_fresh_token.isRight()).toBeTruthy();

    expect(new_fresh_token.value).toHaveProperty('token');
    expect(new_fresh_token.value).toHaveProperty('refresh_token');

    expect(new_fresh_token.value).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    );

    expect(new_fresh_token.value).toEqual(
      expect.objectContaining({ refresh_token: expect.any(String) }),
    );
  });

  it('should not be able to create a new refresh token when refresh token does not exists', async () => {
    const user_id = uuidProviderInMemory.generateUUID();
    const refresh_token = uuidProviderInMemory.generateUUID();

    const refresh_token_id = uuidProviderInMemory.generateUUID();
    const expires_date_refresh_token = dateProviderInMemory.addDays(30);

    await usersTokensRepositoryInMemory.create({
      id: refresh_token_id,
      user_id,
      token: refresh_token,
      type: 'refresh_token',
      expires_date: expires_date_refresh_token,
    });

    const new_fresh_token = await refreshTokenUseCase.createNewRefreshToken({
      refresh_token: refresh_token,
    });

    expect(new_fresh_token.isLeft()).toBeTruthy();

    expect(new_fresh_token.value).toEqual(new RefreshTokenDoesNotExists());
  });

  it('should not be able to create a new refresh token when user token is wrong', async () => {
    jest.spyOn(UserTokens, 'create').mockImplementation(() => {
      return new Left(new InvalidTypeError('wrong_type'));
    });

    const user_id = uuidProviderInMemory.generateUUID();
    const expires_date = '30d';

    const refresh_token_id = uuidProviderInMemory.generateUUID();
    const expires_date_refresh_token = dateProviderInMemory.addDays(30);

    const refresh_token = tokenProviderInMemory.generateToken({
      secret: 'test',
      payload: { email },
      subject: user_id,
      expiresIn: expires_date,
    });

    await usersTokensRepositoryInMemory.create({
      id: refresh_token_id,
      user_id,
      token: refresh_token,
      type: 'refresh_token',
      expires_date: expires_date_refresh_token,
    });

    const new_fresh_token = await refreshTokenUseCase.createNewRefreshToken({
      refresh_token: refresh_token,
    });

    expect(new_fresh_token.isLeft()).toBeTruthy();
  });
});
