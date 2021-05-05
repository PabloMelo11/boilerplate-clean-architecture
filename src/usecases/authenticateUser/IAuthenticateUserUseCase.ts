import { AuthenticateUserRequestDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';
import { AuthenticateUserResponseDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserResponseDTO';

interface IAuthenticateUserUseCase {
  execute(
    data: AuthenticateUserRequestDTO,
  ): Promise<AuthenticateUserResponseDTO>;
}

export { IAuthenticateUserUseCase };
