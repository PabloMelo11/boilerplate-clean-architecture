import { ShowProfileUserResponseDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserResponseDTO';
import { ShowProfileUserRequestDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

interface IShowProfileUserUseCase {
  loadProfile(
    data: ShowProfileUserRequestDTO,
  ): Promise<ShowProfileUserResponseDTO>;
}

export { IShowProfileUserUseCase };
