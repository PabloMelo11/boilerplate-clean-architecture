import { ShowProfileUserResponseDTO } from '@/domain/usecases/showProfileUser/dtos/ShowProfileUserResponseDTO';
import { ShowProfileUserRequestDTO } from '@/domain/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

interface IShowProfileUserUseCase {
  loadProfile(
    data: ShowProfileUserRequestDTO,
  ): Promise<ShowProfileUserResponseDTO>;
}

export { IShowProfileUserUseCase };
