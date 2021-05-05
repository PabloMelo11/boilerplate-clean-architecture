import { ShowProfileUserDTO } from '@/usecases/showProfileUser/dtos/ShowProfileUserDTO';

interface IShowProfileUserUseCase {
  loadProfile(user_id: string): Promise<ShowProfileUserDTO>;
}

export { IShowProfileUserUseCase };
