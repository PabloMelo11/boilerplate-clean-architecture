import { AuthenticateUserRequestDTO } from '@/modules/accounts/useCases/authenticateUser/dtos/AuthenticateUserRequestDTO';
import { AuthenticateUserResponseDTO } from '@/modules/accounts/useCases/authenticateUser/dtos/AuthenticateUserResponseDTO';

interface IAuthenticateUserUseCase {
  execute(
    data: AuthenticateUserRequestDTO,
  ): Promise<AuthenticateUserResponseDTO>;
}

export { IAuthenticateUserUseCase };
