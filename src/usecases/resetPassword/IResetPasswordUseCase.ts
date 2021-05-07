import { ResetPasswordRequestDTO } from '@/usecases/resetPassword/dtos/ResetPasswordRequestDTO';
import { ResetPasswordResponseDTO } from '@/usecases/resetPassword/dtos/ResetPasswordResponseDTO';

interface IResetPasswordUseCase {
  resetPassword(
    data: ResetPasswordRequestDTO,
  ): Promise<ResetPasswordResponseDTO>;
}

export { IResetPasswordUseCase };
