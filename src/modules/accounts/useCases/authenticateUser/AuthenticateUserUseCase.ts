import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';

import { IAuthenticateUserUseCase } from '@/modules/accounts/useCases/authenticateUser/IAuthenticateUserUseCase';
import { AuthenticateUserRequestDTO } from '@/modules/accounts/useCases/authenticateUser/dtos/AuthenticateUserRequestDTO';
import { AuthenticateUserResponseDTO } from '@/modules/accounts/useCases/authenticateUser/dtos/AuthenticateUserResponseDTO';

class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    data: AuthenticateUserRequestDTO,
  ): Promise<AuthenticateUserResponseDTO> {
    throw new Error();
  }
}

export { AuthenticateUserUseCase };
