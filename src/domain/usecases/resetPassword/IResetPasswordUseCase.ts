import { ResetPasswordRequestDTO } from '@/domain/usecases/resetPassword/dtos/ResetPasswordRequestDTO';
import { ResetPasswordResponseDTO } from '@/domain/usecases/resetPassword/dtos/ResetPasswordResponseDTO';

interface IResetPasswordUseCase {
  resetPassword(
    data: ResetPasswordRequestDTO,
  ): Promise<ResetPasswordResponseDTO>;
}

export { IResetPasswordUseCase };
