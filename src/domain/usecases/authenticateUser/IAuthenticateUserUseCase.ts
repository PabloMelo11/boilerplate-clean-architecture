import { AuthenticateUserRequestDTO } from '@/domain/usecases/authenticateUser/dtos/AuthenticateUserRequestDTO';
import { AuthenticateUserResponseDTO } from '@/domain/usecases/authenticateUser/dtos/AuthenticateUserResponseDTO';

interface IAuthenticateUserUseCase {
  authenticate(
    data: AuthenticateUserRequestDTO,
  ): Promise<AuthenticateUserResponseDTO>;
}

export { IAuthenticateUserUseCase };
