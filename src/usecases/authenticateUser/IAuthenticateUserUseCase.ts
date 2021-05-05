import { AuthenticateUserRequestDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';
import { AuthenticateUserResponseDTO } from '@/usecases/authenticateUser/dtos/AuthenticateUserResponseDTO';

interface IAuthenticateUserUseCase {
  authenticate(
    data: AuthenticateUserRequestDTO,
  ): Promise<AuthenticateUserResponseDTO>;
}

export { IAuthenticateUserUseCase };
