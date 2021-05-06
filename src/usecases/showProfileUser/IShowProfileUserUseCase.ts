import { ShowProfileUserDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserDTO';
import { ShowProfileUserRequestDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserRequestDTO';

interface IShowProfileUserUseCase {
  loadProfile(data: ShowProfileUserRequestDTO): Promise<ShowProfileUserDTO>;
}

export { IShowProfileUserUseCase };
